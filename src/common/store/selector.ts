import { apiSlice } from './api.slice';
import { TRootState } from '.';

export const selectUser = (state: TRootState) => apiSlice.endpoints.getProfile.select()(state).data?.data;
export const selectUserId = (state: TRootState) => selectUser(state)?._id ?? null;
export const selectUserEmail = (state: TRootState) => selectUser(state)?.email ?? null;
export const selectUserFirstName = (state: TRootState) => selectUser(state)?.firstName ?? null;
export const selectUserLastName = (state: TRootState) => selectUser(state)?.lastName ?? null;
export const selectUserImage = (state: TRootState) => selectUser(state)?.picture ?? null;

export const selectCustomBreadcrumb = (state: TRootState) => state.general.customBreadcrumb ?? {};
export const selectSidebarOpen = (state: TRootState) => state.general.sidebarOpen ?? false;
export const selectColorTheme = (state: TRootState) => state.general.colorTheme ?? 'light';
