// React
import { useEffect, useState } from 'react';

// Helper
import { useForm, UseFormReturn } from 'react-hook-form';

// MUI Components
import { Box, Button, Divider, Grid, Typography } from '@mui/material';

// Local Components
import { ProfileChangePassword, ProfileChangeData, ProfileChangeImage } from '.';

import { FunctionVoid, FunctionVoidWithParams } from '@/common/types';
import { ProfileRequest } from '../store/profile.api.slice';

export type ProfileChildProps<T> = {
  formMethods: UseFormReturn<ProfileRequest>;
  formOptions: T;
  disabled?: boolean;
};

export type ProfileProps = {
  isFirstTime: boolean;
  isEditable: boolean;
  disabled?: boolean;
  submit: FunctionVoidWithParams<ProfileRequest>;
  handleEditButton?: FunctionVoid;
};

const ProfileUI = ({ isFirstTime, isEditable, disabled, submit, handleEditButton }: ProfileProps) => {
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);

  const form = useForm<ProfileRequest>({ mode: 'all' });
  const { handleSubmit, getValues, resetField } = form;

  const onClickChangePassword = () => setIsChangePassword((prevState) => !prevState);

  const validationChangeData = {
    firstName: { required: true },
    lastName: { required: true },
  };

  const validationImage = { image: { required: false } };

  const validationChangePassword = {
    resetPassword: { required: true },
    confirmResetPassword: {
      required: true,
      validate: {
        sameConfirmPassword: (v: string) => v === getValues('resetPassword'),
      },
    },
  };

  const onSubmit = handleSubmit((data) => {
    submit(data);
  });

  useEffect(() => {
    if (!isChangePassword) {
      resetField('resetPassword');
      resetField('confirmResetPassword');
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
                formOptions={validationChangePassword}
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
        </Box>
      </Grid>
    </Grid>
  );
};

export default ProfileUI;
