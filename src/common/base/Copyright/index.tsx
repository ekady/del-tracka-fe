// Components
import { Typography, TypographyProps } from '@mui/material';

const Copyright = (props: TypographyProps) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ my: 2 }} {...props}>
      {'Copyright © Dyah Eka Lestari '}
      {new Date().getFullYear()}
    </Typography>
  );
};

export default Copyright;
