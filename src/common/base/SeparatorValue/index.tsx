import { Box } from '@mui/material';

import { Text } from './styled';

export type SeparatorValueProps = {
  value: string | number;
  isUsingSeparator?: boolean;
};

const SeparatorValue = ({ value, isUsingSeparator }: SeparatorValueProps) => (
  <Box sx={{ my: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
    <Text>{value}</Text>
    {isUsingSeparator && <Text>-</Text>}
  </Box>
);

export default SeparatorValue;
