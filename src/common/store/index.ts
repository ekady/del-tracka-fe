import { GetServerSidePropsContext } from 'next';
import { Context, createWrapper } from 'next-redux-wrapper';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers, configureStore, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import toastError from '@/common/base/ErrorToastContainer/toastError';
import { IErrorToastContainerProps } from '../base/ErrorToastContainer';

// Slice Reducer
import authSlice from '@/features/auth/store/auth.slice';
import { apiSlice } from './api.slice';
import generalSlice from './general.slice';

const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (typeof window !== undefined) {
    if (isRejectedWithValue(action)) {
      const errorMessage = action.payload.data?.errors?.[0]?.message ?? action.error.message;
      const errorType = action.payload.data?.errors?.[0]?.errorType ?? 'ERROR';

      const toastPayload: IErrorToastContainerProps = {
        message: errorType === 'TOO_MANY_REQUESTS' ? 'Too many requests. Try again later' : errorMessage,
        requestId: action.meta?.baseQueryMeta?.response?.headers?.get?.('X-Request-Id'),
      };
      if (errorType === 'TOO_MANY_REQUESTS' || errorType !== 'ACCESS_TOKEN_EXPIRED') {
        toastError(toastPayload);
      }
    }
  }
  return next(action);
};

const combinedReducer = combineReducers({
  auth: authSlice,
  general: persistReducer(
    { key: 'tracka-persist-general', version: 1, storage, whitelist: ['colorTheme'] },
    generalSlice,
  ),
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const storeFn = (context?: Context) =>
  configureStore({
    reducer: combinedReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
        thunk: {
          extraArgument: {
            cookies: (context as GetServerSidePropsContext)?.req?.cookies,
          },
        },
      })
        .concat(apiSlice.middleware)
        .concat(rtkQueryErrorLogger);
    },
  });

export type TAppStore = ReturnType<typeof storeFn>;
export const wrapper = createWrapper<TAppStore>(storeFn, { debug: process.env.NODE_ENV === 'development' });

export type TRootState = ReturnType<TAppStore['getState']>;
export type TAppDispatch = TAppStore['dispatch'];

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
