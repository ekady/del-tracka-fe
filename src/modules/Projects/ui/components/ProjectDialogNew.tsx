// Local Components
import { BaseDialog } from '@/common/base';
import { FunctionVoid } from '@/types';

// Helper
import { useForm } from 'react-hook-form';

// Local Component
import ProjectNewForm from './ProjectNewForm';

// Types
import { ProjectNameType } from '../../types';

export type ProjectDialogNewProps = {
  handleOk?: FunctionVoid;
  handleCancel?: FunctionVoid;
  isEdit?: boolean;
  isOpen?: boolean;
};

const ProjectDialogNew = ({ isEdit, isOpen, handleOk, handleCancel }: ProjectDialogNewProps) => {
  const form = useForm<ProjectNameType>({ mode: 'all' });
  const {
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = form;

  const validation = {
    projectName: {
      required: true,
    },
    description: {
      required: true,
    },
  };

  const handleClickOk = handleSubmit(async (data) => {
    await trigger();
    if (errors.projectName?.type) return;

    console.log(data);
    handleOk && handleOk();
    resetForm();
  });

  const handleClickCancel = () => {
    handleCancel && handleCancel();
    resetForm();
  };

  const resetForm = () => {
    reset({
      projectName: '',
      description: '',
    });
  };

  const propsBaseDialog = {
    titleDialog: isEdit ? 'Edit Project Name' : 'Add Project',
    isOpen: !!isOpen,
    handleCancel: handleClickCancel,
    handleOk: handleClickOk,
    textOk: isEdit ? 'Edit' : 'Add',
  };

  return (
    <BaseDialog {...propsBaseDialog}>
      <ProjectNewForm formOptions={validation} formMethods={form} onSubmit={handleClickOk} />
    </BaseDialog>
  );
};

export default ProjectDialogNew;
