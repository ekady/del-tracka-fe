// MUI Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Types
import { IInformationWithColor } from '@/common/types';

export type TProjectOverviewProps = IInformationWithColor;

const ProjectOverview = ({ name, value, color, textColor }: TProjectOverviewProps) => {
  const styleItem = {
    textAlign: 'center',
    backgroundColor: color ?? 'white',
    color: textColor ?? 'black',
    border: '1px solid #ccc',
    borderRadius: 6,
    py: 2,
  };

  return (
    <Grid item xs={6} sm={3} xl={2} sx={styleItem}>
      <Typography sx={{ fontSize: 32, fontWeight: 'bold' }}>{value}</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>{name}</Typography>
    </Grid>
  );
};

export default ProjectOverview;
