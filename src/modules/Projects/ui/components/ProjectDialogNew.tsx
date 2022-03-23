// MUI Componnets
import { Box, TextField } from '@mui/material';

// Local Components
import { BaseDialog, CustomInputs } from '@/common/components/base';

// Helper
import { useForm } from 'react-hook-form';

export interface ProjectDialogNewProps {
  handleOk?: () => void;
  handleCancel?: () => void;
  isEdit?: boolean;
  isOpen?: boolean;
}

export type ProjectName = {
  projectName: string;
};

export default function ProjectDialogNew({ isEdit, isOpen, handleOk, handleCancel }: ProjectDialogNewProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm<ProjectName>({ mode: 'all' });

  const validation = {
    projectName: {
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
      <Box component="form" noValidate onSubmit={handleClickOk} sx={{ mt: 1 }}>
        <CustomInputs
          Component={TextField}
          name="Project Name"
          error={errors.projectName}
          componentProps={{
            ...register('projectName', { ...validation.projectName }),
            margin: 'normal',
            fullWidth: true,
            placeholder: 'Enter Project Name',
            name: 'projectName',
            id: 'projectName',
          }}
        />
      </Box>
    </BaseDialog>
  );
}
