import { combineReducers, configureStore, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createWrapper } from 'next-redux-wrapper';

// Slice Reducer
import authSlice from '@/features/auth/store/auth.slice';
import { apiSlice } from './api.slice';
import generalSlice from './general.slice';
import { ErrorToastContainerProps } from '../base/ErrorToastContainer';
import toastError from '@/common/base/ErrorToastContainer/toastError';

const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (typeof window !== undefined) {
    if (isRejectedWithValue(action)) {
      const errorMessage = action.payload.data?.errors?.[0].message ?? action.error.message;
      const errorType = action.payload.data?.errors?.[0].errorType ?? 'ERROR';

      const toastPayload: ErrorToastContainerProps = {
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
  auth: persistReducer({ key: 'tracka-persist-auth', version: 1, storage, blacklist: ['data'] }, authSlice),
  general: persistReducer(
    { key: 'tracka-persist-general', version: 1, storage, whitelist: ['colorTheme'] },
    generalSlice,
  ),
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(apiSlice.middleware)
      .concat(rtkQueryErrorLogger),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const makeStore = () => store;
type AppStore = ReturnType<typeof makeStore>;
export const wrapper = createWrapper<AppStore>(makeStore, { debug: process.env.NODE_ENV === 'development' });

export default store;
