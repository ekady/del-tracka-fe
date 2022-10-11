import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useGetProfileQuery } from '@/common/store/api.slice';
import { ProfileRequest } from '../store/profile.api.slice';

export const useProfileForm = () => {
  const { data } = useGetProfileQuery();
  const form = useForm<ProfileRequest>({
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
    }
  }, [data, form]);

  return form;
};
