// MUI Components
import { Divider, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { FunctionVoid, PropsChildren } from '@/types';

export type BaseDialogProps = PropsChildren & {
  handleOk?: FunctionVoid;
  notUsingOk?: boolean;
  textOk?: string;
  handleCancel?: FunctionVoid;
  notUsingCancel?: boolean;
  textCancel?: string;
  isOpen?: boolean;
  titleDialog: string;
};

const BaseDialog = ({
  isOpen,
  handleOk,
  notUsingOk,
  textOk,
  handleCancel,
  notUsingCancel,
  textCancel,
  titleDialog,
  children,
}: BaseDialogProps) => {
  return (
    <Dialog open={!!isOpen} onClose={handleCancel} PaperProps={{ sx: { borderRadius: 5 } }}>
      <DialogTitle>{titleDialog}</DialogTitle>
      <Divider />
      <DialogContent sx={{ mb: 5, minHeight: 100, minWidth: 300 }}>{children}</DialogContent>
      <DialogActions sx={{ mb: 1, px: 3 }}>
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

export default BaseDialog;
