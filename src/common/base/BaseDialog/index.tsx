// MUI Components
import { Divider, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { FunctionVoid, IPropsChildren } from '@/common/types';
import ButtonLoading from '../ButtonLoading';

export interface BaseDialogProps extends IPropsChildren {
  handleOk?: FunctionVoid;
  hideButtonOk?: boolean;
  textOk?: string;
  handleCancel?: FunctionVoid;
  hideCancel?: boolean;
  textCancel?: string;
  isOpen?: boolean;
  titleDialog: string;
  loading?: boolean;
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
  children,
}: BaseDialogProps) => {
  return (
    <Dialog open={!!isOpen} onClose={() => handleCancel && handleCancel()} PaperProps={{ sx: { borderRadius: 5 } }}>
      <DialogTitle>{titleDialog}</DialogTitle>
      <Divider />
      <DialogContent sx={{ mb: 5, minHeight: 100, minWidth: 300 }}>{children}</DialogContent>
      <DialogActions sx={{ mb: 1, px: 3 }}>
        {!hideCancel && (
          <Button onClick={() => handleCancel && handleCancel()} variant="outlined" fullWidth disabled={loading}>
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
