// MUI Component
import { Autocomplete, Box, TextField as TextFieldMUI, Typography } from '@mui/material';

// MUI Utils
import { styled } from '@mui/material/styles';

// MUI Colors
import { grey } from '@mui/material/colors';

const TextField = styled(TextFieldMUI)(() => ({
  '& .MuiInputBase-root': {
    backgroundColor: '#fff',
  },
}));

export default function ProjectIssueFilter() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          md: 'row',
        },
        justifyContent: 'space-between',
        alignItems: 'center',
        px: 3,
        py: 2,
        background: grey[200],
        borderRadius: 4,
        width: '100%',
      }}
    >
      <Typography sx={{ flexGrow: 1 }}>Filter</Typography>
      <Box
        sx={{
          width: {
            xs: '100%',
            md: 'unset',
          },
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          justifyContent: {
            xs: 'start',
            md: 'space-between',
          },
          alignItems: 'center',
        }}
      >
        <Box sx={{ px: { xs: 0, md: 3 }, minWidth: { xs: '100%', md: 200 } }}>
          <Typography sx={{ mb: 1, mt: { xs: 1, md: 0 } }}>Level</Typography>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={[]}
            renderInput={(params) => <TextField {...params} size="small" placeholder="Level" />}
          />
        </Box>
        <Box sx={{ pl: { xs: 0, md: 3 }, minWidth: { xs: '100%', md: 200 } }}>
          <Typography sx={{ mb: 1, mt: { xs: 1, md: 0 } }}>Status</Typography>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={[]}
            renderInput={(params) => <TextField {...params} size="small" placeholder="Status" />}
          />
        </Box>
      </Box>
    </Box>
  );
}
