// React
import { ReactNode } from 'react';

// MUI Componnets
import { Divider, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export interface BaseDialogProps {
  handleOk?: () => void;
  notUsingOk?: boolean;
  textOk?: string;
  handleCancel?: () => void;
  notUsingCancel?: boolean;
  textCancel?: string;
  isOpen?: boolean;
  titleDialog: string;
  children: ReactNode;
}

export default function BaseDialog({
  isOpen,
  handleOk,
  notUsingOk,
  textOk,
  handleCancel,
  notUsingCancel,
  textCancel,
  titleDialog,
  children,
}: BaseDialogProps) {
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
}
