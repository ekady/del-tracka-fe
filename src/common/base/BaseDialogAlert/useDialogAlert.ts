import { FunctionVoid } from '@/common/types';
import { useState } from 'react';
import { BaseDialogAlertProps } from '.';

type BaseDialogOption = Omit<BaseDialogAlertProps, 'titleDialog' | 'description'>;

const useDialogAlert = () => {
  const [dialogAlertOpt, setDialogAlertOpt] = useState<BaseDialogAlertProps>({
    isOpen: false,
    type: 'success',
    titleDialog: 'Success',
    description: '',
    hideCancel: true,
  });

  const closeDialogAlert = (callback?: FunctionVoid) => {
    setDialogAlertOpt((option) => ({ ...option, isOpen: !option.isOpen }));
    if (callback && typeof callback === 'function') callback();
  };

  const openDialogSuccess = (
    title?: string,
    description?: string,
    options?: BaseDialogOption,
    callback?: FunctionVoid,
  ) => {
    setDialogAlertOpt((option) => ({
      ...option,
      isOpen: true,
      type: 'success',
      titleDialog: title || 'Success',
      description: description || 'You have successfully completed the action',
      subDescription: '',
      hideCancel: true,
      ...options,
    }));
    callback && callback();
  };

  const openDialogError = (
    title?: string,
    description?: string,
    options?: BaseDialogOption,
    callback?: FunctionVoid,
  ) => {
    setDialogAlertOpt((option) => ({
      ...option,
      isOpen: true,
      type: 'error',
      titleDialog: title || 'Error',
      description: description || 'An error has occurred',
      subDescription: '',
      hideCancel: true,
      ...options,
    }));
    callback && callback();
  };

  const openDialogWarning = (
    title?: string,
    description?: string,
    options?: BaseDialogOption,
    callback?: FunctionVoid,
  ) => {
    setDialogAlertOpt((option) => ({
      ...option,
      isOpen: true,
      type: 'warning',
      titleDialog: title || 'Warning',
      description: description || 'Before you continue, please make sure you have read the information',
      subDescription: '',
      hideCancel: false,
      ...options,
    }));
    callback && callback();
  };

  return { dialogAlertOpt, closeDialogAlert, openDialogSuccess, openDialogError, openDialogWarning };
};

export default useDialogAlert;
