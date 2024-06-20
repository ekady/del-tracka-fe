// MUI Components
import { memo } from 'react';

import { Box, InputLabel } from '@mui/material';
import { Control, Controller, FieldError } from 'react-hook-form';

import FileUploaderSingle from '@/app/_common/base/FileUploader/FileUploaderSingle';
import { IFileStream } from '@/app/_common/types';
import { IProfileRequest } from '@/app/_common/types/profile.type';

interface IProfileImageFormContentProps {
  disabled?: boolean;
  errorPicture: Pick<FieldError, 'type'>;
  control: Control<IProfileRequest>;
}
const validationImage = { picture: { required: false } };

const ProfileImageFormContent = ({ errorPicture, disabled, control }: IProfileImageFormContentProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: { xs: 'center', sm: 'flex-end' },
        justifyContent: 'center',
      }}
    >
      <Box sx={{ width: 200, textAlign: 'center', marginBottom: 1 }}>
        <InputLabel>Profile Picture</InputLabel>
      </Box>
      <Controller
        name="picture"
        control={control}
        defaultValue={null}
        rules={validationImage.picture}
        render={({ field }) => (
          <FileUploaderSingle
            hideTextFile
            buttonOutsideContainer
            widthContainer={200}
            heightContainer={200}
            buttonUploadText="Change Image"
            disabled={disabled}
            error={errorPicture}
            value={field.value}
            handleValue={(file: File | IFileStream | string | null) => field.onChange(file)}
            hideRemoveIcon
            maxSizeKb={500}
          />
        )}
      />
    </Box>
  );
};

export default memo(ProfileImageFormContent);
