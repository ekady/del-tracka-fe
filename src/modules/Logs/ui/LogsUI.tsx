// MUI Component
import { Box } from '@mui/material';

// MUI Icons
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import { SeparatorValue } from '@/common/base';

export type Logs = {
  id: string;
  date: string;
  projectName: string;
  cardNumber: string;
  feature: string;
  activity: string;
};

export type LogsUIProps = {
  logs: Logs[];
  notFullInfo?: boolean;
  isUsingDate?: boolean;
  isUsingProjectName?: boolean;
  isUsingCardNumber?: boolean;
  isUsingFeature?: boolean;
};

const LogsUI = (props: LogsUIProps) => {
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
};

export default LogsUI;
