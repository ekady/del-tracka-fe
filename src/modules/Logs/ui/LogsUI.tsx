// MUI Component
import { Box, Typography as TypographyMUI } from '@mui/material';

// MUI Icons
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// MUI utils
import { styled } from '@mui/material/styles';

const Typography = styled(TypographyMUI)(() => ({
  paddingLeft: 5,
  paddingRight: 5,
  fontSize: 12,
}));

export type Logs = {
  id: string;
  date: string;
  projectName: string;
  cardNumber: string;
  feature: string;
  activity: string;
};

export interface LogsUIProps {
  logs: Logs[];
  notFullInfo?: boolean;
  isUsingDate?: boolean;
  isUsingProjectName?: boolean;
  isUsingCardNumber?: boolean;
  isUsingFeature?: boolean;
}

interface SeparatorValueProps {
  value: string | number;
  isNotUsingSeparator?: boolean;
}

const SeparatorValue = ({ value, isNotUsingSeparator }: SeparatorValueProps) => (
  <Box sx={{ my: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
    <Typography>{value}</Typography>
    {!isNotUsingSeparator && <Typography>-</Typography>}
  </Box>
);

export default function LogsUI(props: LogsUIProps) {
  return (
    <>
      {props.logs.map((item) => (
        <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }} key={item.id}>
          <FiberManualRecordIcon sx={{ fontSize: 12 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', ml: 1 }}>
            {props.notFullInfo ? (
              <>
                {props.isUsingDate && <SeparatorValue value={item.date} />}
                {props.isUsingProjectName && <SeparatorValue value={item.projectName} />}
                {props.isUsingCardNumber && <SeparatorValue value={item.cardNumber} />}
                {props.isUsingFeature && <SeparatorValue value={item.feature} />}
              </>
            ) : (
              <>
                <SeparatorValue value={item.date} />
                <SeparatorValue value={item.projectName} />
                <SeparatorValue value={item.cardNumber} />
                <SeparatorValue value={item.feature} />
              </>
            )}
          </Box>
          <SeparatorValue value={item.activity} isNotUsingSeparator />
        </Box>
      ))}
    </>
  );
}
