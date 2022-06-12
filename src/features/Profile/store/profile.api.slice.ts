import { FileIndexable } from '@/common/base/FileUploader';
import { convertImageIndexableFormData } from '@/common/helper';
import { apiSlice } from '@/common/store/api.slice';
import { UserType } from '@/types';

export interface Profile {
  firstName: string;
  lastName: string;
}

export interface ProfilePassword {
  resetPassword?: string;
  confirmResetPassword?: string;
}

export interface ProfileRequest extends Profile, ProfilePassword {
  image?: FileIndexable | null;
  imageUrl?: string | null;
}

export const profileApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    updateProfile: builder.mutation<UserType, ProfileRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('firstname', body.firstName);
        formData.append('lastname', body.lastName);
        !!body.resetPassword && formData.append('resetPassword', body.resetPassword);
        !!body.confirmResetPassword && formData.append('confirmResetPassword', body.confirmResetPassword);
        !!body.image && convertImageIndexableFormData(formData, body.image, 'image', 'imageOld');
        return { url: '/profile', method: 'PUT', body: formData };
      },
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useUpdateProfileMutation } = profileApiSlice;
export const { resetApiState } = profileApiSlice.util;
