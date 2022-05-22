import { apiSlice, UserInfoResponse } from './api.slice';
import { RootState } from './store';

const initialData: UserInfoResponse = {
  credential: {
    refreshToken: null,
    token: null,
  },
  user: {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    imageURL: null,
    isFirstLogin: false,
  },
};

const selectUserInfoData = (state: RootState) => apiSlice.endpoints.getUserInfo.select()(state).data;
export const selectCredential = (state: RootState) => selectUserInfoData(state)?.credential ?? initialData.credential;
export const selectCredentialToken = (state: RootState) =>
  selectUserInfoData(state)?.credential.token ?? initialData.credential.token;
export const selectCredentialRefreshToken = (state: RootState) =>
  selectUserInfoData(state)?.credential.refreshToken ?? initialData.credential.refreshToken;
export const selectUser = (state: RootState) => selectUserInfoData(state)?.user ?? initialData.user;
export const selectUserId = (state: RootState) => selectUserInfoData(state)?.user.id ?? initialData.user.id;
export const selectUserEmail = (state: RootState) => selectUserInfoData(state)?.user.email ?? initialData.user.email;
export const selectUserFirstName = (state: RootState) => selectUserInfoData(state)?.user.firstName ?? initialData.user.firstName;
export const selectUserLastName = (state: RootState) => selectUserInfoData(state)?.user.lastName ?? initialData.user.lastName;
export const selectUserImage = (state: RootState) => selectUserInfoData(state)?.user.imageURL ?? initialData.user.imageURL;
export const selectUserIsFirstLogin = (state: RootState) =>
  selectUserInfoData(state)?.user.isFirstLogin ?? initialData.user.isFirstLogin;
