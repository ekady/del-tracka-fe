// Next
import Link from 'next/link';
import { useRouter } from 'next/router';

// MUI Components
import { Settings } from '@mui/icons-material';

// MUI Icons
import { Avatar, Box, Grid, IconButton, Typography } from '@mui/material';

export default function ProjectDetailTitle() {
  const router = useRouter();

  const memberAndSettings = (
    <Box>
      <Box display="inline-flex">
        <Link href={`${router.asPath}/${true ? 'member' : 'setting'}`} passHref>
          <Box display="flex" marginRight={1} className="cursor-pointer">
            <Avatar sx={{ width: 26, height: 26, fontSize: 14, marginRight: -1 }}>H</Avatar>
            <Avatar sx={{ bgcolor: 'orange', width: 26, height: 26, fontSize: 14, marginRight: -1 }}>N</Avatar>
            <Avatar sx={{ bgcolor: 'darkblue', width: 26, height: 26, fontSize: 14 }}>O</Avatar>
            <Typography marginLeft={1}>+ 13 Members</Typography>
          </Box>
        </Link>
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
        <Typography variant="h6" gutterBottom>
          Health Care 1
        </Typography>
        <Box display={{ xs: 'flex', md: 'none' }} my={2}>
          {memberAndSettings}
        </Box>
        <Typography variant="subtitle2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Turpis nunc eget lorem dolor sed viverra ipsum. Fames ac turpis egestas sed tempus urna et pharetra pharetra. In
          nibh mauris cursus mattis molestie a. Donec adipiscing tristique risus nec.
        </Typography>
      </Grid>
      <Grid item xs={12} md="auto" display={{ xs: 'none', md: 'flex' }}>
        {memberAndSettings}
      </Grid>
    </>
  );
}
