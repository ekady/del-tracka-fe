'use client';

import { BaseSyntheticEvent, useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FieldError, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { actionDeleteProfile, actionUpdateProfile } from '@/app/_common/actions/profile.action';
import BaseDialogAlert from '@/app/_common/base/BaseDialogAlert';
import useDialogAlert from '@/app/_common/base/BaseDialogAlert/useDialogAlert';
import { TFunctionVoid } from '@/app/_common/types';
import { IProfileRequest, IProfileResponse } from '@/app/_common/types/profile.type';
import ProfileDataFormContent from '@/app/app/profile/_components/ProfileDataFormContent';
import ProfileImageFormContent from '@/app/app/profile/_components/ProfileImageFormContent';
import ProfilePasswordFormContent from '@/app/app/profile/_components/ProfilePasswordFormContent';
import { passwordValidator } from '@/app/auth/sign-up/_helper/passwordConfirm';

export interface IProfileFormProps {
  profile: IProfileResponse;
}

const ProfileForm = ({ profile }: IProfileFormProps) => {
  const router = useRouter();
  const { handleSubmit, resetField, ...formState } = useForm<IProfileRequest>({
    mode: 'all',
    defaultValues: profile ?? {},
  });

  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { dialogAlertOpt, closeDialogAlert, openDialogWarning, openDialogSuccess } = useDialogAlert();

  const onClickChangePassword = () => setIsChangePassword((prevState) => !prevState);

  const onSubmit = handleSubmit(async (data) => {
    const passwordValidation = passwordValidator(data.password ?? '');
    if (isChangePassword && !passwordValidation.isAllTrue) return;

    setLoading(true);
    try {
      const response = await actionUpdateProfile(data);

      if (response.isSuccess) {
        resetField('password');
        resetField('passwordConfirm');
        setIsChangePassword(false);
        toast.success('Profile updated successfully!');
      }
      if (response.isError) toast.error(response.message);
    } finally {
      setLoading(false);
    }
  }) as (e?: BaseSyntheticEvent) => void;

  const deleteAccountFn = useCallback(async () => {
    try {
      setLoading(true);
      const response = await actionDeleteProfile();

      if (response.isSuccess) {
        openDialogSuccess(undefined, undefined, {
          handleOk: () => router.replace('/auth/sign-in'),
          hideCancel: true,
        });
      }
      if (response.isError) toast.error(response.message);
    } finally {
      setLoading(false);
    }
  }, [router, openDialogSuccess]);

  const openDialogDeleteConfirm = useCallback(() => {
    openDialogWarning('Warning', 'Are your sure want to delete your account?', {
      handleOk: deleteAccountFn as TFunctionVoid,
      handleCancel: closeDialogAlert,
    });
  }, [closeDialogAlert, deleteAccountFn, openDialogWarning]);

  useEffect(() => {
    if (!isChangePassword) {
      resetField('password');
      resetField('passwordConfirm');
    }
  }, [isChangePassword, resetField]);

  return (
    <Grid container spacing={2} size={{ xs: 12, md: 12 }}>
      <Grid size={{ xs: 12 }}>
        <Typography component="div" variant="h6" align="center">
          Your Profile
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Divider orientation="horizontal" flexItem sx={{ mb: 2 }} />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Box component="form" noValidate onSubmit={onSubmit}>
          <Grid container spacing={5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ProfileImageFormContent
                disabled={loading}
                errorPicture={formState.formState.errors.picture as Pick<FieldError, 'type'>}
                control={formState.control}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <ProfileDataFormContent disabled={loading} {...formState} />
              {isChangePassword ? (
                <>
                  <Box sx={{ my: 2 }}>
                    <Typography align="center" component="span" variant="subtitle2">
                      Change Password
                    </Typography>
                    <Button
                      color="primary"
                      variant="outlined"
                      onClick={onClickChangePassword}
                      size="small"
                      disabled={loading}
                      sx={{ ml: 2 }}
                    >
                      Cancel
                    </Button>
                  </Box>
                  <ProfilePasswordFormContent disabled={loading} {...formState} />
                </>
              ) : (
                <Button
                  disabled={loading}
                  color="secondary"
                  variant="contained"
                  sx={{ mt: 4 }}
                  onClick={onClickChangePassword}
                >
                  Change Password
                </Button>
              )}
            </Grid>
          </Grid>

          <Box mt={8} display="flex" justifyContent="flex-end">
            <Box display="grid" gap={2} gridTemplateColumns="1fr 1fr" alignItems="center">
              <LoadingButton fullWidth loading={loading} variant="contained" type="submit">
                Save
              </LoadingButton>
              <LoadingButton
                fullWidth
                variant="outlined"
                color="error"
                disabled={loading}
                onClick={openDialogDeleteConfirm}
              >
                Delete Account
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Grid>
      <BaseDialogAlert {...dialogAlertOpt} />
    </Grid>
  );
};

export default ProfileForm;
