// MUI Components
import { Box, Typography } from '@mui/material';

// Local Components
import { FileUploaderSingle } from '@/common/base';

// Reack Hook Form
import { Controller, FieldError, RegisterOptions } from 'react-hook-form';

// Interfaces
import { ProfileChildProps } from './Profile';
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
        <Typography align="center" component="p" variant="subtitle2" sx={{ mt: 1 }}>
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
            error={errors.picture as Pick<FieldError, 'type'>}
            value={field.value}
            handleValue={(file: File | Thumbnail | null) => field.onChange(file)}
            hideRemoveIcon
            maxSizeKb={500}
          />
        )}
      />
    </Box>
  );
};

export default ProfileChangeImage;
