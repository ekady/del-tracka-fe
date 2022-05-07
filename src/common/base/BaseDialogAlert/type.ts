import { ReactNode } from 'react';

export type DialogAlertType = 'warning' | 'delete' | 'success';

export interface BaseDialogAlertProps {
  type?: DialogAlertType;
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
