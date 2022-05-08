import { Box } from '@mui/material';

import { Text } from './styled';

export type SeparatorValueProps = {
  value: string | number;
  isNotUsingSeparator?: boolean;
};

const SeparatorValue = ({ value, isNotUsingSeparator }: SeparatorValueProps) => (
  <Box sx={{ my: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
    <Text>{value}</Text>
    {!isNotUsingSeparator && <Text>-</Text>}
  </Box>
);

export default SeparatorValue;
