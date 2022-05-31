// MUI Components
import { Box, Typography } from '@mui/material';

// Local Components
import { FileUploader } from '@/common/base';

import { ProfileChildProps } from './Profile';
import { Controller, FieldError, RegisterOptions } from 'react-hook-form';
import { FileIndexable } from '@/common/base/FileUploader';

export type ProfileImage = {
  image?: RegisterOptions;
};

export type ProfileChangeImageProps = ProfileChildProps<ProfileImage>;

const ProfileChangeImage = ({ formMethods, formOptions, disabled }: ProfileChangeImageProps) => {
  const {
    control,
    formState: { errors },
  } = formMethods;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', sm: 'flex-end' },
        justifyContent: 'center',
        mr: { xs: 0, sm: 3 },
      }}
    >
      <Box sx={{ width: 200 }}>
        <Typography align="center" component="p" variant="subtitle2" sx={{ mt: 1, color: 'black' }}>
          Profile Picture
        </Typography>
      </Box>
      <Controller
        name="image"
        control={control}
        defaultValue={{}}
        rules={formOptions.image}
        render={({ field }) => (
          <FileUploader
            hideRemoveIcon
            hideTextFile
            buttonOutsideContainer
            imageFullWidth
            widthContainer={200}
            heightContainer={200}
            buttonUploadText="Change Image"
            disabled={disabled}
            error={errors.image as FieldError}
            value={field.value}
            handleValue={(file: FileIndexable) => field.onChange(file)}
          />
        )}
      />
    </Box>
  );
};

export default ProfileChangeImage;
