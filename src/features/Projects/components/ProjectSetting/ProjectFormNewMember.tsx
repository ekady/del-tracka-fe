// React
import { useEffect, useState } from 'react';

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
import { AutocompleteOptions, FunctionVoidWithParams } from '@/types';

const ProjectFormNewMember = () => {
  const projectId = useRouter().query.project_id as string;
  const [addMember, { isLoading, fulfilledTimeStamp, isUninitialized }] = useAddMemberMutation();
  const [labelRole, setLabelRole] = useState<AutocompleteOptions | null>(null);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ProjectMemberRequest>({ mode: 'all', defaultValues: { role: '', id: '' } });

  const validation = {
    id: { required: true },
    role: { required: true },
  };

  const onChangeAutoComplete = (onChangeForm: FunctionVoidWithParams<string>, item: AutocompleteOptions | null) => {
    onChangeForm(item?.value ?? '');
    setLabelRole(item);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await addMember({ id: projectId, body: { id: data.id, role: data.role } });
      if ('data' in response) {
        toast.success('Member added successfully: ' + data.id);
      }
    } catch {
      //
    }
  });

  useEffect(() => {
    if (fulfilledTimeStamp || isUninitialized) {
      reset();
      setLabelRole(null);
    }
  }, [projectId, reset, fulfilledTimeStamp, isUninitialized]);

  return (
    <Grid container columns={12} columnSpacing={1} alignItems="start" justifyContent="space-between">
      <Grid item xs={12} md={5}>
        <Controller
          name="id"
          control={control}
          defaultValue=""
          rules={validation.id}
          render={({ field }) => (
            <CustomInput
              fieldname="User"
              error={errors.id}
              TextFieldProps={{ placeholder: 'Enter user', ...field, disabled: isLoading }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Controller
          name="role"
          control={control}
          rules={validation.role}
          render={({ field: { onChange } }) => (
            <Autocomplete
              id="tags-outlined"
              options={ProjectRolesArray}
              disableClearable={!!labelRole}
              value={labelRole}
              onChange={(_, item) => onChangeAutoComplete(onChange, item)}
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
