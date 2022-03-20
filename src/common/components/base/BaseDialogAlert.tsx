// React
import { ReactNode } from 'react';

// MUI Componnets
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

// MUI Icons
import { Warning, Delete, CheckCircle } from '@mui/icons-material';

// MUI Colors
import { grey, blueGrey } from '@mui/material/colors';

export interface BaseDialogAlertProps {
  type?: 'warning' | 'delete' | 'success';
  handleOk?: () => void;
  notUsingOk?: boolean;
  textOk?: string;
  handleCancel?: () => void;
  notUsingCancel?: boolean;
  textCancel?: string;
  isOpen?: boolean;
  titleDialog: string;
  description?: string;
  subDescription?: string;
  children?: ReactNode;
}

export default function BaseDialogAlert({
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
}: BaseDialogAlertProps) {
  const iconProps = {
    sx: { fontSize: 125, my: 3 },
  };
  return (
    <Dialog open={!!isOpen} onClose={handleCancel} PaperProps={{ sx: { borderRadius: 5 } }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          minHeight: 100,
          minWidth: 300,
        }}
      >
        {type === 'warning' ? (
          <Warning {...iconProps} color="warning" />
        ) : type === 'delete' ? (
          <Delete {...iconProps} color="error" />
        ) : (
          <CheckCircle {...iconProps} color="success" />
        )}
        <DialogTitle sx={{ my: 1, padding: 0, fontSize: 20, fontWeight: 'bold' }}>{titleDialog}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography color={grey[800]}>{description}</Typography>
            <Typography color={blueGrey[300]}>{subDescription}</Typography>
          </Box>
        </DialogContent>
        {children}
      </Box>
      <DialogActions sx={{ mb: 3, px: 3 }}>
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
