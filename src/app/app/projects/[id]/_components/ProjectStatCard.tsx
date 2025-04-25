import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { IInformationWithColor } from '@/app/_common/types';

export type TProjectStatCardProps = IInformationWithColor;

const ProjectStatCard = ({ name, value, color, textColor }: TProjectStatCardProps) => {
  const styleItem = {
    textAlign: 'center',
    backgroundColor: color ?? 'white',
    color: textColor ?? 'black',
    border: '1px solid #ccc',
    borderRadius: 6,
    py: 2,
  };

  return (
    <Grid size={{ xs: 12, sm: 3, xl: 2 }} sx={styleItem}>
      <Typography sx={{ fontSize: 32, fontWeight: 'bold' }}>{value}</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>{name}</Typography>
    </Grid>
  );
};

export default ProjectStatCard;
