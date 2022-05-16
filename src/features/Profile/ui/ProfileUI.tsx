// React
import { useEffect, useState } from 'react';

// Helper
import { useForm } from 'react-hook-form';

// MUI Components
import { Box, Button, Divider, Grid, Typography } from '@mui/material';

// Local Components
import { ProfileChangePassword, ProfileChangeData, ProfileChangeImage } from './components';
import { ProfileChangeDataField } from './components/ProfileChangeData';
import { ProfileChangePasswordField } from './components/ProfileChangePassword';

import { FunctionVoid, FunctionVoidWithParams } from '@/types';

export type ProfileData = ProfileChangeDataField & ProfileChangePasswordField;

export type ProfileProps = {
  isFirstTime: boolean;
  isEditable: boolean;
  submit: FunctionVoidWithParams<ProfileData>;
  handleEditButton?: FunctionVoid;
};

const ProfileUI = ({ isFirstTime, isEditable, submit, handleEditButton }: ProfileProps) => {
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);

  const form = useForm<ProfileData>({ mode: 'all' });
  const { handleSubmit, getValues, resetField } = form;

  const onClickChangePassword = () => setIsChangePassword((prevState) => !prevState);

  const validationChangeData = {
    firstName: {
      required: true,
    },
    lastName: {
      required: true,
    },
  };

  const validationChangePassword = {
    password: {
      required: true,
    },
    confirm_password: {
      required: true,
      validate: {
        sameConfirmPassword: (v: string) => v === getValues('password'),
      },
    },
  };

  const onSubmit = handleSubmit((data) => {
    submit(data);
  });

  useEffect(() => {
    if (!isChangePassword) {
      resetField('password');
      resetField('confirm_password');
    }
  }, [isChangePassword]);

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
        <ProfileChangeImage />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <ProfileChangeData formMethods={form} formOptions={validationChangeData} disabled={!isEditable} />
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
              <ProfileChangePassword formMethods={form} formOptions={validationChangePassword} disabled={!isEditable} />
            </>
          ) : (
            buttonChangePassword
          )}
        </Box>
        <Box>
          {isEditable ? (
            <Button fullWidth variant="contained" sx={{ mt: 4 }} onClick={onSubmit}>
              Save {isFirstTime ? 'and Next' : ''}
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
