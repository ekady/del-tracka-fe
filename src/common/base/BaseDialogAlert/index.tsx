import { useCallback } from 'react';

// MUI Components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';

// MUI Colors
import { grey, blueGrey } from '@mui/material/colors';

// Local Components
import { CheckCircle, DialogContainer, DialogActions, DialogTitle, Delete, TextContainer, Warning } from './styled';
import ButtonLoading from '../ButtonLoading';

// Hooks
import { useAppSelector } from '@/common/store';

import { TFunctionVoid, IPropsChildren } from '@/common/types';
import { selectColorTheme } from '@/common/store/selector';

export type TDialogAlertType = 'warning' | 'error' | 'success';

export interface IBaseDialogAlertProps extends IPropsChildren {
  type?: TDialogAlertType;
  handleOk?: TFunctionVoid;
  hideButtonOk?: boolean;
  textOk?: string;
  handleCancel?: TFunctionVoid;
  hideCancel?: boolean;
  textCancel?: string;
  isOpen?: boolean;
  titleDialog: string;
  description?: string;
  subDescription?: string;
  loading?: boolean;
}

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
}: IBaseDialogAlertProps) => {
  const onCancel = useCallback(() => {
    if (!loading && handleCancel) handleCancel();
  }, [handleCancel, loading]);
  const isDark = useAppSelector(selectColorTheme) === 'dark';

  return (
    <Dialog open={!!isOpen} onClose={onCancel} PaperProps={{ sx: { borderRadius: 5, py: 4, px: 3 } }}>
      <DialogContainer>
        {type === 'warning' ? <Warning /> : type === 'error' ? <Delete /> : <CheckCircle />}
        <DialogTitle>{titleDialog}</DialogTitle>
        <DialogContent>
          <TextContainer>
            <Typography color={isDark ? grey[200] : grey[800]}>{description}</Typography>
            <Typography color={isDark ? blueGrey[100] : blueGrey[300]}>{subDescription}</Typography>
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
