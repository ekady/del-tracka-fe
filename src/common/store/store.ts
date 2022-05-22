import { configureStore } from '@reduxjs/toolkit';

// Slice Reducer
import authSlice from '@/features/Auth/store/auth.slice';
import { apiSlice } from './api.slice';

import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorMessage = action.error.data?.message ?? action.error.message;
    if (typeof window !== undefined) toast.error(errorMessage);
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

export default store;
