// React
import { BaseSyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';

// Next
import { useRouter } from 'next/router';

// Helper
import { UseFormGetValues, UseFormReturn } from 'react-hook-form';

// MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Local Components
import { ProfileChangePassword, ProfileChangeData, ProfileChangeImage } from '.';

import { TFunctionVoid, TFunctionVoidWithParams } from '@/common/types';
import { IProfileRequest, useDeleteProfileMutation } from '../store/profile.api.slice';
import { useProfileForm } from '../hooks/useProfileForm';
import { BaseDialogAlert, ButtonLoading } from '@/common/base';
import useDialogAlert from '@/common/base/BaseDialogAlert/useDialogAlert';
import { passwordValidator } from '@/common/base/PasswordRequirement/helper';

export interface IProfileChildProps<T> {
  formMethods: UseFormReturn<IProfileRequest>;
  formOptions: T;
  disabled?: boolean;
}

export interface IProfileProps {
  isFirstTime: boolean;
  isEditable: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  submit: TFunctionVoidWithParams<IProfileRequest>;
  handleEditButton?: TFunctionVoid;
}

const validationChangeData = {
  firstName: { required: true },
  lastName: { required: true },
  email: { required: true },
};

const validationImage = { picture: { required: false } };

const validationChangePassword = (getValues: UseFormGetValues<IProfileRequest>) => ({
  password: { required: true },
  passwordConfirm: {
    required: true,
    validate: {
      sameConfirmPassword: (v: string) => v === getValues('password'),
    },
  },
});

const Profile = ({ isFirstTime, isEditable, disabled, isLoading, submit, handleEditButton }: IProfileProps) => {
  const router = useRouter();
  const form = useProfileForm();
  const { handleSubmit, getValues, resetField } = form;

  const [deleteAccount] = useDeleteProfileMutation();
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const { dialogAlertOpt, closeDialogAlert, openDialogWarning, openDialogSuccess } = useDialogAlert();

  const validatePassword = useMemo(() => validationChangePassword(getValues), [getValues]);

  const onClickChangePassword = () => setIsChangePassword((prevState) => !prevState);

  const onSubmit = handleSubmit((data) => {
    const passwordValidation = passwordValidator(data.password ?? '');
    if (isChangePassword && !passwordValidation.isAllTrue) return;
    submit(data);
  }) as (e?: BaseSyntheticEvent) => void;

  const deleteAccountFn = useCallback(async () => {
    await deleteAccount().unwrap();
    openDialogSuccess(undefined, undefined, {
      handleOk: () => router.replace('/auth/logout'),
      hideCancel: true,
    });
  }, [router, deleteAccount, openDialogSuccess]);

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
                <Typography align="center" component="span" variant="subtitle2">
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
            <ButtonLoading
              fullWidth
              loading={isLoading}
              variant="contained"
              sx={{ mt: 4 }}
              onClick={onSubmit}
              disabled={disabled}
            >
              Save
            </ButtonLoading>
          ) : (
            <ButtonLoading fullWidth loading={isLoading} variant="outlined" sx={{ mt: 4 }} onClick={handleEditButton}>
              Edit
            </ButtonLoading>
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
