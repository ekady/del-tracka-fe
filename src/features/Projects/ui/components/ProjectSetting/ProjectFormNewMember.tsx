// React
import { MouseEvent } from 'react';

// React Hook Form
import { RegisterOptions, UseFormReturn } from 'react-hook-form';

// MUI Components
import { Button, Grid } from '@mui/material';

// Local Components
import { CustomInput } from '@/common/base';

// Types
import { FunctionVoidWithParams } from '@/types';

export type ProjectNewMemberForm = 'userIds' | 'roleId';

export type ProjectFormNewMemberField = {
  [key in ProjectNewMemberForm]: string;
};

export type ProjectFormNewMemberValidation = {
  [key in ProjectNewMemberForm]: RegisterOptions;
};

export type ProjectFormNewMemberProps = {
  formMethods: UseFormReturn<ProjectFormNewMemberField>;
  formOptions: ProjectFormNewMemberValidation;
  disabled?: boolean;
  onSubmit?: FunctionVoidWithParams<MouseEvent<HTMLButtonElement>>;
};

const ProjectFormNewMember = ({ formMethods, formOptions, onSubmit, disabled }: ProjectFormNewMemberProps) => {
  const {
    register,
    formState: { errors },
  } = formMethods;

  return (
    <Grid container columns={12} columnSpacing={1} alignItems="start" justifyContent="space-between">
      <Grid item xs={12} md={5}>
        <CustomInput
          fieldname="User"
          error={errors.userIds}
          TextFieldProps={{
            placeholder: !disabled ? 'Enter User' : '',
            disabled,
            ...register('userIds', { ...formOptions.userIds }),
          }}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <CustomInput
          fieldname="Role"
          error={errors.roleId}
          TextFieldProps={{
            placeholder: !disabled ? 'Select role' : '',
            disabled,
            ...register('roleId', { ...formOptions.roleId }),
          }}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <Button fullWidth variant="contained" sx={{ marginTop: { xs: 0, md: '17px' } }} onClick={onSubmit}>
          Add
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProjectFormNewMember;
