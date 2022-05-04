// React
import { MouseEvent } from 'react';

// React Hook Form
import { RegisterOptions, UseFormReturn } from 'react-hook-form';

// MUI Components
import { Button, Grid, TextField } from '@mui/material';

// Local Components
import { CustomInputs } from '@/common/components/base';

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
        <CustomInputs
          Component={TextField}
          name="User"
          error={errors.userIds}
          componentProps={{
            ...register('userIds', {
              ...formOptions.userIds,
            }),
            margin: 'normal',
            fullWidth: true,
            placeholder: 'Enter User',
            disabled,
          }}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <CustomInputs
          Component={TextField}
          name="Role"
          error={errors.roleId}
          componentProps={{
            ...register('roleId', {
              ...formOptions.roleId,
            }),
            margin: 'normal',
            fullWidth: true,
            placeholder: 'Select role',
            type: 'roleId',
            name: 'roleId',
            id: 'roleId',
            disabled,
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
