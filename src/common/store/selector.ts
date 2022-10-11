import { Credential, UserInfo } from '@/common/types';
import { apiSlice } from './api.slice';
import { RootState } from '.';

const initialDataProfile: UserInfo = {
  id: null,
  email: null,
  firstName: null,
  lastName: null,
  imageURL: null,
  isFirstLogin: false,
};
const initialDataToken: Credential = {
  accessToken: null,
};

export const selectUser = (state: RootState) => apiSlice.endpoints.getUserInfo.select()(state).data;
export const selectUserId = (state: RootState) => selectUser(state)?.id ?? initialDataProfile.id;
export const selectUserEmail = (state: RootState) => selectUser(state)?.email ?? initialDataProfile.email;
export const selectUserFirstName = (state: RootState) => selectUser(state)?.firstName ?? initialDataProfile.firstName;
export const selectUserLastName = (state: RootState) => selectUser(state)?.lastName ?? initialDataProfile.lastName;
export const selectUserImage = (state: RootState) => selectUser(state)?.imageURL ?? initialDataProfile.imageURL;
export const selectUserIsFirstLogin = (state: RootState) =>
  selectUser(state)?.isFirstLogin ?? initialDataProfile.isFirstLogin;

export const selectCredential = (state: RootState) => apiSlice.endpoints.getCredential.select()(state).data;
export const selectCredentialToken = (state: RootState) =>
  selectCredential(state)?.accessToken ?? initialDataToken.accessToken;