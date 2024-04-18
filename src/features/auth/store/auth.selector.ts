import { TRootState } from '@/common/store';

export const selectCredential = (state: TRootState) => state.auth.data.ICredential;
export const selectCredentialToken = (state: TRootState) => state.auth.data.ICredential.accessToken;
