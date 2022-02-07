// Helper
import { useForm } from 'react-hook-form';

// Components
import { Box, Button, Divider, Grid, TextField, Typography } from '@mui/material';
import { CustomInputs } from '../../../common/components/base';

export type ProfileData = {
  firstName: string;
  lastName: string;
};

interface ProfileProps {
  isFirstTime: boolean;
  isEditable: boolean;
  submit: (v: ProfileData) => void;
  handleEditButton?: () => void;
}

export default function ProfileUI({ isFirstTime, isEditable, submit, handleEditButton }: ProfileProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileData>({ mode: 'all' });

  const validation = {
    firstName: {
      required: true,
    },
    lastName: {
      required: true,
    },
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    submit(data);
  });

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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: {
              xs: 'center',
              sm: 'flex-end',
            },
            justifyContent: 'center',
            mr: {
              xs: 0,
              sm: 3,
            },
          }}
        >
          <Box sx={{ width: 200 }}>
            <Typography align="center" component="p" variant="subtitle2" sx={{ mt: 1, color: 'black' }}>
              Profile Picture
            </Typography>
          </Box>
          <Box
            sx={{
              width: 200,
              height: 200,
              backgroundColor: 'primary.dark',
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
          <CustomInputs
            Component={TextField}
            name="First Name"
            error={errors.firstName}
            componentProps={{
              ...register('firstName', {
                ...validation.firstName,
              }),
              margin: 'normal',
              fullWidth: true,
              placeholder: isEditable ? 'Enter Your First Name' : '',
              id: 'firstName',
              name: 'firstName',
              disabled: !isEditable,
            }}
          />
          <CustomInputs
            Component={TextField}
            name="Last Name"
            error={errors.lastName}
            componentProps={{
              ...register('lastName', {
                ...validation.lastName,
              }),
              margin: 'normal',
              fullWidth: true,
              placeholder: isEditable ? 'Enter Your Last Name' : '',
              name: 'lastName',
              id: 'lastName',
              disabled: !isEditable,
            }}
          />
          {isEditable ? (
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }}>
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
}
