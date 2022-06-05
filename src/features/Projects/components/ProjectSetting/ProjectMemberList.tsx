// Next
import { useRouter } from 'next/router';

// MUI Components
import { Box, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// Local Components
import { DataTable, TableHeader, TableMenuSelection } from '@/common/base';

import { useGetProjectMembersQuery, useUpdateRoleMemberMutation } from '../../store/project.api.slice';
import { skipToken } from '@reduxjs/toolkit/dist/query';

export type ProjectMemberListProps = {
  hideSelectOption?: boolean;
};

const roleExample = [
  { text: 'Admin', value: 'ADMIN' },
  { text: 'Maintainer', value: 'MAINTAINER' },
  { text: 'Developer', value: 'DEVELOPER' },
  { text: 'Submitter', value: 'SUBMITTER' },
];

const ProjectMemberList = ({ hideSelectOption }: ProjectMemberListProps) => {
  const projectId = useRouter().query?.project_id as string;
  const { isFetching, data } = useGetProjectMembersQuery(projectId || skipToken);
  const [updateRoleMember, { isLoading }] = useUpdateRoleMemberMutation();

  const onChangeRole = (userId?: string) => async (role: string) => {
    try {
      if (userId) await updateRoleMember({ id: projectId, body: { id: userId, role: role.toLowerCase().toUpperCase() } });
    } catch {
      //
    }
  };

  const renderCellRole = (params: GridRenderCellParams<string>) => (
    <>
      <Typography>{params.row?.roleName ?? params.value}</Typography>
      {!hideSelectOption && (
        <TableMenuSelection
          list={roleExample}
          currentValue={params.value}
          handleChange={onChangeRole(params.row?.id)}
          IconProps={{ sx: { bgcolor: 'transparent' } }}
        />
      )}
    </>
  );

  const tableHeaders: GridColDef[] = [
    { headerName: 'Name', field: 'name', width: 120 },
    { headerName: 'Date Added', field: 'dateAdded', width: 300 },
    { headerName: 'Added By', field: 'addedBy', width: 200 },
    { headerName: 'Role', field: 'role', width: 200, editable: true, renderCell: renderCellRole },
  ];
  return (
    <>
      <TableHeader header={<Typography fontWeight="bold">Health Care Member</Typography>} isUsingSearch />
      <Box sx={{ height: 20 }} />
      <DataTable
        rows={data ?? []}
        rowCount={undefined}
        paginationMode="client"
        sortingMode="client"
        columns={tableHeaders}
        loading={isFetching || isLoading}
      />
    </>
  );
};

export default ProjectMemberList;
