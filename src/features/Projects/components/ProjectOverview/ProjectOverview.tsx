// MUI Components
import { Grid, Typography } from '@mui/material';

// Types
import { InformationWithColor } from '@/common/types';

export type ProjectOverviewProps = InformationWithColor;

const ProjectOverview = ({ name, value, color, textColor }: ProjectOverviewProps) => {
  const styleItem = {
    textAlign: 'center',
    backgroundColor: color ?? 'white',
    color: textColor ?? 'black',
    border: '1px solid #ccc',
    borderRadius: 6,
    py: 2,
  };

  return (
    <Grid item xs={12} sm={6} md={3} sx={styleItem}>
      <Typography sx={{ fontSize: 32, fontWeight: 'bold' }}>{value}</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>{name}</Typography>
    </Grid>
  );
};

export default ProjectOverview;
