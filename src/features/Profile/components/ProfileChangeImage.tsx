// MUI Components
import { Box, Typography } from '@mui/material';

// Local Components
import { FileUploaderSingle } from '@/common/base';

import { ProfileChildProps } from './Profile';
import { Controller, RegisterOptions } from 'react-hook-form';
import { Thumbnail } from '@/common/base/FileUploader/interfaces';

export interface ProfileImage {
  picture?: RegisterOptions;
}

export interface ProfileChangeImageProps extends ProfileChildProps<ProfileImage> {}

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
        name="picture"
        control={control}
        defaultValue={null}
        rules={formOptions.picture}
        render={({ field }) => (
          <FileUploaderSingle
            hideTextFile
            buttonOutsideContainer
            widthContainer={200}
            heightContainer={200}
            buttonUploadText="Change Image"
            disabled={disabled}
            error={errors.picture}
            value={field.value}
            handleValue={(file: File | Thumbnail | null) => field.onChange(file)}
          />
        )}
      />
    </Box>
  );
};

export default ProfileChangeImage;
