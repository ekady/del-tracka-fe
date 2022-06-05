// React
import { useEffect } from 'react';

// Next
import { useRouter } from 'next/router';

// React Hook Form
import { Controller, useForm } from 'react-hook-form';

// MUI Components
import { Autocomplete, Grid } from '@mui/material';

// Local Components
import { ButtonLoading, CustomInput } from '@/common/base';

import { ProjectRolesArray } from '../../constant/role';
import { ProjectMemberRequest, useAddMemberMutation } from '../../store/project.api.slice';

import { toast } from 'react-toastify';

const ProjectFormNewMember = () => {
  const projectId = useRouter().query.project_id as string;
  const [addMember, { isLoading }] = useAddMemberMutation();
  const {
    handleSubmit,
    formState: { errors },
    control,
    resetField,
  } = useForm<ProjectMemberRequest>({ mode: 'all', defaultValues: { role: 'MAINTAINER' } });

  const validation = {
    id: { required: true },
    role: { required: true },
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await addMember({ id: projectId, body: { id: data.id, role: data.role } });
      if ('data' in response) {
        toast.success('Member added successfully');
        resetField('id', { defaultValue: '' });
      }
    } catch {
      //
    }
  });

  useEffect(() => {
    resetField('id', { defaultValue: '' });
    resetField('role', { defaultValue: 'MAINTAINER' });
  }, [projectId, resetField]);

  return (
    <Grid container columns={12} columnSpacing={1} alignItems="start" justifyContent="space-between">
      <Grid item xs={12} md={5}>
        <Controller
          name="id"
          control={control}
          defaultValue=""
          rules={validation.id}
          render={({ field }) => (
            <CustomInput fieldname="User" error={errors.id} TextFieldProps={{ placeholder: 'Enter user', ...field }} />
          )}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Controller
          name="role"
          control={control}
          rules={validation.role}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              id="tags-outlined"
              options={ProjectRolesArray}
              onChange={(_, item) => onChange(item?.value)}
              value={ProjectRolesArray.find((item) => item.value === value)}
              disableClearable
              renderInput={(params) => (
                <CustomInput
                  fieldname="Role"
                  error={errors.role}
                  TextFieldProps={{
                    ...params,
                    placeholder: 'Select role',
                    size: 'small',
                    disabled: isLoading,
                  }}
                />
              )}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <ButtonLoading
          loading={isLoading}
          fullWidth
          variant="contained"
          sx={{ marginTop: { xs: 0, md: '17px' } }}
          onClick={onSubmit}
        >
          Add
        </ButtonLoading>
      </Grid>
    </Grid>
  );
};

export default ProjectFormNewMember;
