import { RootState } from '@/common/store';

export const selectCredential = (state: RootState) => state.auth.data.credential;
export const selectCredentialToken = (state: RootState) => state.auth.data.credential.accessToken;
export const selectCredentialRefreshToken = (state: RootState) => state.auth.data.credential.refreshToken;
export const selectUser = (state: RootState) => state.auth.data.user;
export const selectUserId = (state: RootState) => state.auth.data.user.id;
export const selectUserEmail = (state: RootState) => state.auth.data.user.email;
export const selectUserFirstName = (state: RootState) => state.auth.data.user.firstName;
export const selectUserLastName = (state: RootState) => state.auth.data.user.lastName;
export const selectUserImage = (state: RootState) => state.auth.data.user.imageURL;
