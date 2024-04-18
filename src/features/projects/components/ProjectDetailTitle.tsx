// Next
import Link from 'next/link';
import { useRouter } from 'next/router';

// MUI Components
import { Settings } from '@mui/icons-material';

// MUI Icons
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export interface IProjectDetailTitleProps {
  title: string;
  description?: string;
  canAccessSettings?: boolean;
}

const ProjectDetailTitle = ({ title, description, canAccessSettings }: IProjectDetailTitleProps) => {
  const router = useRouter();

  const settings = (
    <Box>
      <Box display="inline-flex">
        <Link href={`${router.asPath}/setting`} passHref>
          <IconButton color="primary" sx={{ padding: 0, marginLeft: 1 }}>
            <Settings fontSize="medium" />
          </IconButton>
        </Link>
      </Box>
    </Box>
  );
  return (
    <>
      <Grid item xs={12} md={7}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Box display={{ xs: 'block', md: 'none' }}>{canAccessSettings && settings}</Box>
        </Box>
        <Typography variant="subtitle2">{description}</Typography>
      </Grid>
      <Grid item xs={12} md="auto" display={{ xs: 'none', md: 'flex' }}>
        {canAccessSettings && settings}
      </Grid>
    </>
  );
};

export default ProjectDetailTitle;
