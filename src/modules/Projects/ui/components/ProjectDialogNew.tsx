// Local Components
import { BaseDialog } from '@/common/components/base';

// Helper
import { useForm } from 'react-hook-form';
import ProjectNewForm from './ProjectNewForm';

export interface ProjectDialogNewProps {
  handleOk?: () => void;
  handleCancel?: () => void;
  isEdit?: boolean;
  isOpen?: boolean;
}

export type ProjectName = {
  projectName: string;
  description: string;
};

export default function ProjectDialogNew({ isEdit, isOpen, handleOk, handleCancel }: ProjectDialogNewProps) {
  const form = useForm<ProjectName>({ mode: 'all' });
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
}
