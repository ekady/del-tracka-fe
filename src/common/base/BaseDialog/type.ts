import { ReactNode } from 'react';

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
