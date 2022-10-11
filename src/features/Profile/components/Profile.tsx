// React
import { useCallback, useEffect, useMemo, useState } from 'react';

// Next
import { useRouter } from 'next/dist/client/router';

// Helper
import { UseFormGetValues, UseFormReturn } from 'react-hook-form';

// MUI Components
import { Box, Button, Divider, Grid, Typography } from '@mui/material';

// Local Components
import { ProfileChangePassword, ProfileChangeData, ProfileChangeImage } from '.';

import { FunctionVoid, FunctionVoidWithParams } from '@/common/types';
import { ProfileRequest, useDeleteProfileMutation } from '../store/profile.api.slice';
import { useProfileForm } from '../hooks/useProfileForm';
import { BaseDialogAlert } from '@/common/base';
import useDialogAlert from '@/common/base/BaseDialogAlert/useDialogAlert';
import { useLogout } from '@/common/hooks/useLogout';

export interface ProfileChildProps<T> {
  formMethods: UseFormReturn<ProfileRequest>;
  formOptions: T;
  disabled?: boolean;
}

export interface ProfileProps {
  isFirstTime: boolean;
  isEditable: boolean;
  disabled?: boolean;
  submit: FunctionVoidWithParams<ProfileRequest>;
  handleEditButton?: FunctionVoid;
}

const validationChangeData = {
  firstName: { required: true },
  lastName: { required: true },
  email: { required: true },
};

const validationImage = { picture: { required: false } };

const validationChangePassword = (getValues: UseFormGetValues<ProfileRequest>) => ({
  password: { required: true },
  passwordConfirm: {
    required: true,
    validate: {
      sameConfirmPassword: (v: string) => v === getValues('password'),
    },
  },
});

const Profile = ({ isFirstTime, isEditable, disabled, submit, handleEditButton }: ProfileProps) => {
  const router = useRouter();
  const form = useProfileForm();
  const { handleSubmit, getValues, resetField } = form;

  const [deleteAccount, { isSuccess }] = useDeleteProfileMutation();
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const { dialogAlertOpt, closeDialogAlert, openDialogWarning, openDialogSuccess } = useDialogAlert();
  const logout = useLogout(true);

  const validatePassword = useMemo(() => validationChangePassword(getValues), [getValues]);

  const onClickChangePassword = () => setIsChangePassword((prevState) => !prevState);
  const onSubmit = handleSubmit((data) => submit(data));
  const openDialogDeleteConfirm = useCallback(() => {
    openDialogWarning('Warning', 'Are your sure want to delete your account?', {
      handleOk: deleteAccount,
      handleCancel: closeDialogAlert,
    });
  }, [closeDialogAlert, deleteAccount, openDialogWarning]);

  useEffect(() => {
    if (isSuccess) {
      openDialogSuccess(undefined, undefined, {
        handleOk: logout,
        hideCancel: true,
      });
    }
  }, [isSuccess, router, openDialogSuccess, logout]);

  useEffect(() => {
    if (!isChangePassword) {
      resetField('password');
      resetField('passwordConfirm');
    }
  }, [isChangePassword, resetField]);

  const buttonChangePassword = !isFirstTime && (
    <Button color="secondary" variant="contained" sx={{ mt: 4 }} onClick={onClickChangePassword}>
      Change Password
    </Button>
  );

  return (
    <Grid container spacing={2} xs={12} md={12} item>
      <Grid item xs={12}>
        <Typography component="div" variant="h6" align="center">
          {isFirstTime ? 'Set up your profile' : 'Your Profile'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider orientation="horizontal" flexItem sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <ProfileChangeImage formMethods={form} formOptions={validationImage} disabled={!isEditable || disabled} />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <ProfileChangeData formMethods={form} formOptions={validationChangeData} disabled={!isEditable || disabled} />
          {isChangePassword ? (
            <>
              <Box sx={{ my: 2 }}>
                <Typography align="center" component="span" variant="subtitle2" sx={{ color: 'black' }}>
                  Change Password
                </Typography>
                <Button color="primary" variant="outlined" onClick={onClickChangePassword} size="small" sx={{ ml: 2 }}>
                  Cancel
                </Button>
              </Box>
              <ProfileChangePassword
                formMethods={form}
                formOptions={validatePassword}
                disabled={!isEditable || disabled}
              />
            </>
          ) : (
            buttonChangePassword
          )}
        </Box>
        <Box>
          {isEditable ? (
            <Button fullWidth variant="contained" sx={{ mt: 4 }} onClick={onSubmit} disabled={disabled}>
              Save
            </Button>
          ) : (
            <Button fullWidth variant="outlined" sx={{ mt: 4 }} onClick={handleEditButton}>
              Edit
            </Button>
          )}
          <Button fullWidth variant="outlined" color="error" sx={{ mt: 4 }} onClick={openDialogDeleteConfirm}>
            Delete Account
          </Button>
        </Box>
      </Grid>
      <BaseDialogAlert {...dialogAlertOpt} />
    </Grid>
  );
};

export default Profile;
