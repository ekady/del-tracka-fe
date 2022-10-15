import { RootState } from '@/common/store';

export const selectCredential = (state: RootState) => state.auth.data.ICredential;
export const selectCredentialToken = (state: RootState) => state.auth.data.ICredential.accessToken;
