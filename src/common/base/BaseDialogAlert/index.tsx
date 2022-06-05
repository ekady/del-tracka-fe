// MUI Components
import { Button, Dialog, DialogContent, Typography } from '@mui/material';

// MUI Colors
import { grey, blueGrey } from '@mui/material/colors';

// Local Components
import { CheckCircle, DialogContainer, DialogActions, DialogTitle, Delete, TextContainer, Warning } from './styled';
import ButtonLoading from '../ButtonLoading';

import { FunctionVoid, PropsChildren } from '@/types';

export type DialogAlertType = 'warning' | 'error' | 'success';

export type BaseDialogAlertProps = PropsChildren & {
  type?: DialogAlertType;
  handleOk?: FunctionVoid;
  hideButtonOk?: boolean;
  textOk?: string;
  handleCancel?: FunctionVoid;
  hideCancel?: boolean;
  textCancel?: string;
  isOpen?: boolean;
  titleDialog: string;
  description?: string;
  subDescription?: string;
  loading?: boolean;
};

const BaseDialogAlert = ({
  type,
  isOpen,
  handleOk,
  hideButtonOk,
  textOk,
  handleCancel,
  hideCancel,
  textCancel,
  titleDialog,
  description,
  subDescription,
  loading,
  children,
}: BaseDialogAlertProps) => {
  const onCancel = () => {
    if (!loading) handleCancel && handleCancel();
  };

  return (
    <Dialog open={!!isOpen} onClose={onCancel} PaperProps={{ sx: { borderRadius: 5 } }}>
      <DialogContainer>
        {type === 'warning' ? <Warning /> : type === 'error' ? <Delete /> : <CheckCircle />}
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
        {!hideCancel && (
          <Button onClick={onCancel} variant="outlined" fullWidth disabled={loading}>
            {textCancel ? textCancel : 'Cancel'}
          </Button>
        )}
        {!hideButtonOk && (
          <ButtonLoading onClick={handleOk} type="submit" variant="contained" fullWidth loading={loading}>
            {textOk ? textOk : 'Ok'}
          </ButtonLoading>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default BaseDialogAlert;
