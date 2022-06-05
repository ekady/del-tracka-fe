// Local Components
import { BaseDialog } from '@/common/base';
import { FunctionVoid } from '@/types';

// Helper
import { useForm } from 'react-hook-form';

// Local Component
import ProjectNewForm from './ProjectNewForm';

// Types
import { ProjectRequest } from '../types';
import { useCreataProjectMutation } from '../store/project.api.slice';

export type ProjectDialogNewProps = {
  handleOk?: FunctionVoid;
  handleCancel?: FunctionVoid;
  isEdit?: boolean;
  isOpen?: boolean;
};

const ProjectDialogNew = ({ isEdit, isOpen, handleOk, handleCancel }: ProjectDialogNewProps) => {
  const [createProject, { isLoading }] = useCreataProjectMutation();
  const form = useForm<ProjectRequest>({ mode: 'all' });
  const {
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = form;

  const validation = {
    name: {
      required: true,
    },
    description: {
      required: true,
    },
  };

  const handleClickOk = handleSubmit(async (data) => {
    await trigger();
    if (errors.name?.type) return;

    try {
      await createProject(data);
      handleOk && handleOk();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  });

  const handleClickCancel = () => {
    if (!isLoading) {
      handleCancel && handleCancel();
      resetForm();
    }
  };

  const resetForm = () => {
    reset({
      name: '',
      description: '',
    });
  };

  const propsBaseDialog = {
    titleDialog: isEdit ? 'Edit Project Name' : 'Add Project',
    isOpen: !!isOpen,
    handleCancel: () => handleClickCancel(),
    handleOk: handleClickOk,
    textOk: isEdit ? 'Edit' : 'Add',
  };

  return (
    <BaseDialog {...propsBaseDialog} loading={isLoading}>
      <ProjectNewForm formOptions={validation} formMethods={form} onSubmit={handleClickOk} />
    </BaseDialog>
  );
};

export default ProjectDialogNew;
