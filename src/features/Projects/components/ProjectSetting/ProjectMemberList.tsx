import { useCallback } from 'react';

// Next
import { useRouter } from 'next/router';

// MUI Components
import { Box, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// Redux
import { skipToken } from '@reduxjs/toolkit/dist/query';

// Toastify
import { toast } from 'react-toastify';

// Local Components
import { DataTable, TableHeader, TableMenuSelection } from '@/common/base';

// Hooks
import { useGetProjectMembersQuery, useUpdateRoleMemberMutation } from '../../store/project.api.slice';
import useProjectId from '../../hooks/useProjectId';

export interface ProjectMemberListProps {
  hideSelectOption?: boolean;
}

const roleExample = [
  { text: 'OWNER', value: 'OWNER' },
  { text: 'MAINTAINER', value: 'MAINTAINER' },
  { text: 'DEVELOPER', value: 'DEVELOPER' },
  { text: 'SUBMITTER', value: 'SUBMITTER' },
];

const ProjectMemberList = ({ hideSelectOption }: ProjectMemberListProps) => {
  const projectId = useRouter().query?.project_id as string;
  const project = useProjectId();
  const { isFetching, data } = useGetProjectMembersQuery(projectId || skipToken);
  const [updateRoleMember, { isLoading }] = useUpdateRoleMemberMutation();

  const onChangeRole = useCallback(
    (userId?: string) => async (roleName: string) => {
      if (userId) {
        const response = await updateRoleMember({ id: projectId, body: { userId, roleName } }).unwrap();
        if (response.data.message) toast.success('Successfully change role member');
      }
    },
    [projectId, updateRoleMember],
  );

  const renderCellRole = (params: GridRenderCellParams<string>) => (
    <>
      <Typography>{params.row?.roleName ?? params.value}</Typography>
      {!hideSelectOption && (
        <TableMenuSelection
          list={roleExample}
          currentValue={params.value}
          handleChange={onChangeRole(params.row?._id)}
          IconProps={{ sx: { bgcolor: 'transparent' } }}
        />
      )}
    </>
  );

  const tableHeaders: GridColDef[] = [
    {
      headerName: 'Name',
      field: 'name',
      valueGetter: (param) => `${param.row?.firstName} ${param.row?.lastName}`,
      width: 180,
    },
    {
      headerName: 'Date Added',
      field: 'createdAt',
      valueGetter: (param) => new Date(param.row.createdAt).toLocaleDateString(),
      width: 150,
    },
    {
      headerName: 'Added By',
      field: 'createdBy',
      width: 200,
      valueGetter: (param) => `${param.row?.createdBy.firstName} ${param.row?.createdBy.lastName}`,
    },
    {
      headerName: 'Role',
      field: 'role',
      valueGetter: (param) => param.row?.role?.name ?? '-',
      width: 200,
      editable: true,
      renderCell: renderCellRole,
    },
  ];
  return (
    <>
      <TableHeader header={<Typography fontWeight="bold">{project.data?.data.name}</Typography>} />
      <Box sx={{ height: 20 }} />
      <DataTable
        rows={data ?? []}
        rowCount={undefined}
        pagination={undefined}
        paginationMode={undefined}
        hideFooterPagination
        sortingMode="client"
        columns={tableHeaders}
        loading={isFetching || isLoading}
        getRowId={(row) => row._id}
        editMode={undefined}
      />
    </>
  );
};

export default ProjectMemberList;
