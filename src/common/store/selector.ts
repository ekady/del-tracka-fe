import { apiSlice } from './api.slice';
import { RootState } from '.';

export const selectUser = (state: RootState) => apiSlice.endpoints.getProfile.select()(state).data?.data;
export const selectUserId = (state: RootState) => selectUser(state)?._id ?? null;
export const selectUserEmail = (state: RootState) => selectUser(state)?.email ?? null;
export const selectUserFirstName = (state: RootState) => selectUser(state)?.firstName ?? null;
export const selectUserLastName = (state: RootState) => selectUser(state)?.lastName ?? null;
export const selectUserImage = (state: RootState) => selectUser(state)?.picture ?? null;

export const selectCustomBreadcrumb = (state: RootState) => state.general.customBreadcrumb ?? {};
