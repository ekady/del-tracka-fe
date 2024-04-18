// MUI Components
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import Close from '@mui/icons-material/Close';

import { TFunctionVoid, IPropsChildren } from '@/common/types';
import ButtonLoading from '../ButtonLoading';

export interface IBaseDialogProps extends IPropsChildren {
  handleOk?: TFunctionVoid;
  hideButtonOk?: boolean;
  textOk?: string;
  handleCancel?: TFunctionVoid;
  hideCancel?: boolean;
  textCancel?: string;
  isOpen?: boolean;
  titleDialog: string;
  loading?: boolean;
  showClose?: boolean;
  DialogMuiProps?: Omit<DialogProps, 'open'>;
}

const BaseDialog = ({
  isOpen,
  handleOk,
  hideButtonOk,
  textOk,
  handleCancel,
  hideCancel,
  textCancel,
  titleDialog,
  loading,
  showClose,
  children,
  DialogMuiProps,
}: IBaseDialogProps) => {
  return (
    <Dialog
      open={!!isOpen}
      onClose={() => handleCancel?.()}
      PaperProps={{ ...DialogMuiProps, sx: { borderRadius: 5, ...DialogMuiProps?.sx } }}
    >
      <DialogTitle component="div" display="flex" justifyContent="space-between" alignItems="center" gap={3}>
        {titleDialog}
        {showClose && (
          <IconButton onClick={handleCancel}>
            <Close />
          </IconButton>
        )}
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ mb: 5, minHeight: 100, minWidth: 300 }}>{children}</DialogContent>
      <DialogActions sx={{ mb: 1, px: 3 }}>
        {!hideCancel && (
          <Button onClick={() => handleCancel?.()} variant="outlined" fullWidth disabled={loading}>
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

export default BaseDialog;
