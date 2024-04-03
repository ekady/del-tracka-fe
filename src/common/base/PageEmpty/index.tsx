import { Box, Typography } from '@mui/material';
import FolderOffIcon from '@mui/icons-material/FolderOff';

export interface IPageEmptyProps {
  text?: string;
}

const PageEmpty = ({ text }: IPageEmptyProps) => (
  <Box
    minHeight="300px"
    height="100%"
    display="flex"
    flexDirection="column"
    gap={2}
    alignItems="center"
    justifyContent="center"
  >
    <FolderOffIcon sx={{ fontSize: 50 }} />
    <Typography>{text || 'No Data'}</Typography>
  </Box>
);

export default PageEmpty;
