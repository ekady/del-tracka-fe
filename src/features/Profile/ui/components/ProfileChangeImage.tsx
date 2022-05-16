// MUI Components
import { Box, Typography } from '@mui/material';

// Local Components
import { FileUploader } from '@/common/base';

const ProfileChangeImage = () => {
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
      <FileUploader
        hideRemoveIcon
        hideTextFile
        buttonOutsideContainer
        imageFullWidth
        widthContainer={200}
        heightContainer={200}
        buttonUploadText="Change Image"
      />
    </Box>
  );
};

export default ProfileChangeImage;
