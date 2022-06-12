import { configureStore, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Slice Reducer
import authSlice from '@/features/Auth/store/auth.slice';
import { apiSlice } from './api.slice';

import { toast } from 'react-toastify';

const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (typeof window !== undefined) {
    if (isRejectedWithValue(action)) {
      const errorMessage = action.error.data?.message ?? action.error.message;
      toast.error(errorMessage);
    }
  }
  return next(action);
};

const store = configureStore({
  reducer: {
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware).concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
