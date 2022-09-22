import { RootState } from '@/common/store';

export const selectCredential = (state: RootState) => state.auth.data.credential;
export const selectCredentialToken = (state: RootState) => state.auth.data.credential.accessToken;
export const selectCredentialRefreshToken = (state: RootState) => state.auth.data.credential.refreshToken;
