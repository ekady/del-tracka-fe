// React
import { MouseEvent } from 'react';

// React Hook Form
import { RegisterOptions, UseFormReturn } from 'react-hook-form';

// MUI Components
import { Button, Grid } from '@mui/material';

// Local Components
import { CustomInput } from '@/common/base';

export type ProjectFormNewMemberField = {
  userIds: string[];
  roleId: string;
};

export type ProjectFormNewMemberValidation = {
  userIds: RegisterOptions;
  roleId: RegisterOptions;
};

export interface ProjectFormNewMemberProps {
  formMethods: UseFormReturn<ProjectFormNewMemberField>;
  formOptions: ProjectFormNewMemberValidation;
  disabled?: boolean;
  onSubmit?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function ProjectFormNewMember({ formMethods, formOptions, onSubmit, disabled }: ProjectFormNewMemberProps) {
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
}
