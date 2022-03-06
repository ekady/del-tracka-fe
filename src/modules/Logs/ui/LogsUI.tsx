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

export default function LogsUI(props: LogsUIProps) {
  const Separator = () => <Typography>-</Typography>;
  return (
    <>
      {props.logs.map((item) => (
        <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }} key={item.id}>
          <FiberManualRecordIcon sx={{ fontSize: 12 }} />
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', ml: 1 }}>
            {props.notFullInfo ? (
              <>
                {props.isUsingDate && (
                  <>
                    <Typography>{item.date}</Typography> <Separator />
                  </>
                )}
                {props.isUsingProjectName && (
                  <>
                    <Typography>{item.projectName}</Typography> <Separator />
                  </>
                )}
                {props.isUsingCardNumber && (
                  <>
                    <Typography>{item.cardNumber}</Typography> <Separator />
                  </>
                )}
                {props.isUsingFeature && (
                  <>
                    <Typography>{item.feature}</Typography> <Separator />
                  </>
                )}
              </>
            ) : (
              <>
                <Typography>{item.date}</Typography> <Separator />
                <Typography>{item.projectName}</Typography> <Separator />
                <Typography>{item.cardNumber}</Typography> <Separator />
                <Typography>{item.feature}</Typography> <Separator />
              </>
            )}
          </Box>
          <Typography>{item.activity}</Typography>
        </Box>
      ))}
    </>
  );
}
