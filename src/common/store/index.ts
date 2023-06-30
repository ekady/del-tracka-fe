import { combineReducers, configureStore, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createWrapper } from 'next-redux-wrapper';
import { toast } from 'react-toastify';

// Slice Reducer
import authSlice from '@/features/auth/store/auth.slice';
import { apiSlice } from './api.slice';
import generalSlice from './general.slice';

const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (typeof window !== undefined) {
    if (isRejectedWithValue(action)) {
      const errorMessage = action.payload.data?.errors?.[0].message ?? action.error.message;
      const errorType = action.payload.data?.errors?.[0].errorType ?? 'ERROR';

      if (errorType === 'TOO_MANY_REQUESTS') toast.error('Too many requests. Try again later');
      else if (errorType !== 'ACCESS_TOKEN_EXPIRED') toast.error(errorMessage);
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
