// MUI Components
import { Button, Dialog, DialogContent, Typography } from '@mui/material';

// MUI Colors
import { grey, blueGrey } from '@mui/material/colors';

// Local Components
import { CheckCircle, DialogContainer, DialogActions, DialogTitle, Delete, TextContainer, Warning } from './styled';

import { FunctionVoid, PropsChildren } from '@/types';

export type DialogAlertType = 'warning' | 'delete' | 'success';

export type BaseDialogAlertProps = PropsChildren & {
  type?: DialogAlertType;
  handleOk?: FunctionVoid;
  notUsingOk?: boolean;
  textOk?: string;
  handleCancel?: FunctionVoid;
  notUsingCancel?: boolean;
  textCancel?: string;
  isOpen?: boolean;
  titleDialog: string;
  description?: string;
  subDescription?: string;
};

const BaseDialogAlert = ({
  type,
  isOpen,
  handleOk,
  notUsingOk,
  textOk,
  handleCancel,
  notUsingCancel,
  textCancel,
  titleDialog,
  description,
  subDescription,
  children,
}: BaseDialogAlertProps) => {
  return (
    <Dialog open={!!isOpen} onClose={handleCancel} PaperProps={{ sx: { borderRadius: 5 } }}>
      <DialogContainer>
        {type === 'warning' ? <Warning /> : type === 'delete' ? <Delete /> : <CheckCircle />}
        <DialogTitle>{titleDialog}</DialogTitle>
        <DialogContent>
          <TextContainer>
            <Typography color={grey[800]}>{description}</Typography>
            <Typography color={blueGrey[300]}>{subDescription}</Typography>
          </TextContainer>
        </DialogContent>
        {children}
      </DialogContainer>
      <DialogActions>
        {!notUsingCancel && (
          <Button onClick={handleCancel} variant="outlined" fullWidth>
            {textCancel ? textCancel : 'Cancel'}
          </Button>
        )}
        {!notUsingOk && (
          <Button onClick={handleOk} type="submit" variant="contained" fullWidth>
            {textOk ? textOk : 'Ok'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BaseDialogAlert;
