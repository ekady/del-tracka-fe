// Components
import { Typography, TypographyProps } from '@mui/material';

const Copyright = (props: TypographyProps) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }} {...props}>
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

export default Copyright;
