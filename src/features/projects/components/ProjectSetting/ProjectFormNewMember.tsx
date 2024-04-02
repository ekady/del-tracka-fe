// React
import { BaseSyntheticEvent, useCallback, useEffect, useState } from 'react';

// Next
import { useRouter } from 'next/router';

// React Hook Form
import { Controller, useForm } from 'react-hook-form';

// MUI Components
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';

// Local Components
import { ButtonLoading, CustomInput } from '@/common/base';

import { ProjectRolesArray } from '@/features/projects/constant/role';
import { useAddMemberMutation } from '@/features/projects/store/member.api.slice';

import { toast } from 'react-toastify';
import { IAutocompleteOptions, TFunctionVoidWithParams } from '@/common/types';
import { IProjectMemberAddRequest } from '@/features/projects/interfaces';

const validation = {
  email: { required: true },
  roleName: { required: true },
};

const ProjectFormNewMember = () => {
  const projectId = useRouter().query.project_id as string;
  const [addMember, { isLoading, fulfilledTimeStamp, isUninitialized }] = useAddMemberMutation();
  const [labelRole, setLabelRole] = useState<IAutocompleteOptions | null>(null);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<IProjectMemberAddRequest>({ mode: 'all', defaultValues: { roleName: '', email: '' } });

  const onChangeAutoComplete = useCallback(
    (onChangeForm: TFunctionVoidWithParams<string>, item: IAutocompleteOptions | null) => {
      onChangeForm(item?.value ?? '');
      setLabelRole(item);
    },
    [],
  );

  const onSubmit = handleSubmit(async (data) => {
    const response = await addMember({ id: projectId, body: data });
    if (response && 'data' in response && response.data.data) {
      toast.success('Member added successfully: ' + data.email);
    }
  }) as (e?: BaseSyntheticEvent) => void;

  useEffect(() => {
    if (fulfilledTimeStamp || isUninitialized) {
      reset();
      setLabelRole(null);
    }
  }, [reset, fulfilledTimeStamp, isUninitialized]);

  useEffect(() => {
    reset();
    setLabelRole(null);
  }, [projectId, reset]);

  return (
    <Grid container columns={12} columnSpacing={1} alignItems="start" justifyContent="space-between">
      <Grid item xs={12} md={5}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={validation.email}
          render={({ field }) => (
            <CustomInput
              fieldname="User Email"
              error={errors.email}
              TextFieldProps={{ placeholder: 'Enter email', ...field, disabled: isLoading }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} md={5}>
        <Controller
          name="roleName"
          control={control}
          rules={validation.roleName}
          render={({ field: { onChange } }) => (
            <Autocomplete
              options={ProjectRolesArray}
              disableClearable={!!labelRole}
              value={labelRole}
              onChange={(_, item) => onChangeAutoComplete(onChange, item)}
              renderInput={(params) => (
                <CustomInput
                  fieldname="Role"
                  error={errors.roleName}
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
