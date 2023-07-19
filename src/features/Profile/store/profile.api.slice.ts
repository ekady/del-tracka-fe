import { apiSlice } from '@/common/store/api.slice';

import { IApiResponse, IFileStream, IStatusMessageResponse, IUserInfo } from '@/common/types';

export interface Profile {
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface ProfilePassword {
  password?: string;
  passwordConfirm?: string;
}

export interface ProfileRequest extends Profile, ProfilePassword {
  picture?: File | IFileStream | null;
  imageUrl?: string | null;
}

export const profileApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    updateProfile: builder.mutation<IUserInfo, ProfileRequest>({
      query: (body) => {
        const formData = new FormData();
        formData.append('firstName', body?.firstName ?? '');
        formData.append('lastName', body?.lastName ?? '');
        formData.append('email', body?.email ?? '');
        !!body.password && formData.append('password', body.password);
        !!body.passwordConfirm && formData.append('passwordConfirm', body.passwordConfirm);
        if (body.picture && body.picture instanceof File) formData.append('picture', body.picture);

        return { url: '/profile', method: 'PUT', body: formData };
      },
      invalidatesTags: ['Profile'],
    }),
    deleteProfile: builder.mutation<IApiResponse<IStatusMessageResponse>, void>({
      query: () => ({
        url: '/profile',
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useUpdateProfileMutation, useDeleteProfileMutation } = profileApiSlice;
export const { resetApiState } = profileApiSlice.util;
