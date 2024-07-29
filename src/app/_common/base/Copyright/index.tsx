// Components
import Typography, { TypographyProps } from '@mui/material/Typography';

const Copyright = (props: TypographyProps) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ my: 2 }} {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {' Dyah Eka Lestari'}
    </Typography>
  );
};

export default Copyright;
