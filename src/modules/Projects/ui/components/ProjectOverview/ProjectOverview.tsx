import { Grid, Typography } from '@mui/material';

export interface ProjectOverviewProps {
  category: string;
  categoryValue: string | number;
  color?: string;
  textColor?: string;
}

export default function ProjectOverview({ category, categoryValue, color, textColor }: ProjectOverviewProps) {
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      sx={{
        textAlign: 'center',
        backgroundColor: color ?? 'white',
        color: textColor ?? 'black',
        border: '1px solid #ccc',
        borderRadius: 6,
        py: 2,
      }}
    >
      <Typography sx={{ fontSize: 32, fontWeight: 'bold' }}>{categoryValue}</Typography>
      <Typography sx={{ fontSize: 14, fontWeight: 'bold' }}>{category}</Typography>
    </Grid>
  );
}
