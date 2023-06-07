import { BaseSyntheticEvent, useCallback, useEffect } from 'react';

// Local Components
import { BaseDialog } from '@/common/base';
import { FunctionVoid } from '@/common/types';

// Helper
import { useForm } from 'react-hook-form';

// Local Component
import ProjectNewForm from './ProjectNewForm';

// Types
import { IProjectRequest } from '../interfaces';

export interface ProjectDialogNewProps {
  title?: string;
  handleOk?: (data: IProjectRequest, defaultValues?: IProjectRequest) => Promise<void> | void;
  handleCancel?: FunctionVoid;
  isEdit?: boolean;
  isOpen?: boolean;
  loading?: boolean;
  defaultValues?: IProjectRequest;
}

const validation = {
  name: { required: true },
  description: { required: true },
};

const ProjectDialogNew = ({
  title,
  isEdit,
  isOpen,
  handleOk,
  handleCancel,
  loading,
  defaultValues,
}: ProjectDialogNewProps) => {
  const form = useForm<IProjectRequest>({ mode: 'all' });
  const {
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    setValue,
  } = form;

  useEffect(() => {
    if (defaultValues?.name) {
      setValue('description', defaultValues?.description);
      setValue('name', defaultValues.name);
    }

    return () => {
      setValue('description', '');
      setValue('name', '');
    };
  }, [defaultValues, setValue]);

  const resetForm = useCallback(() => {
    reset({
      name: '',
      description: '',
    });
  }, [reset]);

  const handleClickOk = handleSubmit(async (data) => {
    await trigger();
    if (errors.name?.type) return;

    try {
      if (handleOk) {
        await handleOk(data, defaultValues);
      }
      resetForm();
    } catch (error) {
      //
    }
  }) as (e?: BaseSyntheticEvent) => void;

  const handleClickCancel = useCallback(() => {
    if (!loading) {
      handleCancel?.();
      resetForm();
    }
  }, [handleCancel, loading, resetForm]);

  const propsBaseDialog = {
    titleDialog: `${isEdit || defaultValues?.id ? 'Edit' : 'Create'} ${title ?? 'Project'}`,
    isOpen: !!isOpen,
    handleCancel: () => handleClickCancel(),
    handleOk: handleClickOk,
    textOk: isEdit || defaultValues?.id ? 'Edit' : 'Add',
  };

  return (
    <BaseDialog {...propsBaseDialog} loading={loading}>
      <ProjectNewForm
        title={title}
        defaultValues={defaultValues}
        formOptions={validation}
        formMethods={form}
        onSubmit={handleClickOk}
      />
    </BaseDialog>
  );
};

export default ProjectDialogNew;
