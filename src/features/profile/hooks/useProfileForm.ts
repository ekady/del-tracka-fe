import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useGetProfileQuery } from '@/common/store/api.slice';
import { IProfileRequest } from '../store/profile.api.slice';

export const useProfileForm = () => {
  const { data } = useGetProfileQuery();
  const form = useForm<IProfileRequest>({
    mode: 'all',
    defaultValues: {
      firstName: data?.data.firstName ?? '',
      lastName: data?.data.lastName ?? '',
      email: data?.data.email ?? '',
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.setValue('firstName', data?.data.firstName ?? '');
      form.setValue('lastName', data?.data.lastName ?? '');
      form.setValue('email', data?.data.email ?? '');
      form.setValue('picture', data?.data.picture ?? null);
    }
  }, [data, form]);

  return form;
};
