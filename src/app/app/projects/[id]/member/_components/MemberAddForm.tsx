'use client';

// React
import { BaseSyntheticEvent, useCallback, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import CustomInput from '@/app/_common/base/CustomInput';
import { IAutocompleteOptions } from '@/app/_common/types';
import { actionAddMember, revalidateMemberListTag } from '@/app/app/projects/[id]/member/_actions/projectMember.action';
import { ProjectRolesArray } from '@/app/app/projects/_constant/role.constant';
import { IProjectMemberAddRequest } from '@/app/app/projects/_interfaces';

const validation = {
  email: { required: true },
  roleName: { required: true },
};

interface IMemberAddFormProps {
  projectId: string;
}

const MemberAddForm = ({ projectId }: IMemberAddFormProps) => {
  const revalidateMemberList = revalidateMemberListTag.bind(null, projectId);
  const [loading, setLoading] = useState(false);
  const [labelRole, setLabelRole] = useState<IAutocompleteOptions | null>(null);
  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<IProjectMemberAddRequest>({ mode: 'all', defaultValues: { roleName: '', email: '' } });

  const onChangeAutoComplete = useCallback((item: IAutocompleteOptions | null) => {
    setLabelRole(item);
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true);
    try {
      const response = await actionAddMember(
        { projectId },
        { email: data.email, roleName: labelRole?.value as string },
      );
      if (response.isSuccess) {
        toast.success('Member added successfully: ' + data.email);
        revalidateMemberList();
        reset();
        setLabelRole(null);
      }

      if (response.isError) toast.error(response.message);
    } finally {
      setLoading(false);
    }
  }) as (e?: BaseSyntheticEvent) => void;

  return (
    <Grid container columns={12} columnSpacing={1} alignItems="flex-start" justifyContent="space-between">
      <Grid size={{ xs: 12, md: 5 }}>
        <CustomInput
          fieldname="User Email"
          error={errors.email}
          TextFieldProps={{
            placeholder: 'Enter email',
            disabled: loading,
            ...register('email', { ...validation.email }),
          }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 5 }}>
        <Autocomplete
          options={ProjectRolesArray}
          disableClearable={!!labelRole}
          value={labelRole}
          onChange={(_, item) => onChangeAutoComplete(item)}
          renderInput={(params) => (
            <CustomInput
              fieldname="Role"
              error={errors.roleName}
              TextFieldProps={{
                ...params,
                placeholder: 'Select role',
                size: 'small',
                disabled: loading,
              }}
            />
          )}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 2 }}>
        <LoadingButton
          loading={loading}
          fullWidth
          variant="contained"
          sx={{ marginTop: { xs: 0, md: '19px' } }}
          onClick={onSubmit}
        >
          Add
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default MemberAddForm;
