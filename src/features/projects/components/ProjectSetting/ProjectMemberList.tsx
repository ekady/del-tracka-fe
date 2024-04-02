import { useCallback, useEffect } from 'react';

// MUI Components
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// Redux
import { skipToken } from '@reduxjs/toolkit/dist/query';

// Toastify
import { toast } from 'react-toastify';

// Local Components
import { BaseDialogAlert, DataTable, TableAction, TableHeader, TableMenuSelection } from '@/common/base';

// Types | Interfaces
import { TFunctionReturnFunction, TFunctionVoid } from '@/common/types';
import { IProjectMember } from '@/features/projects/interfaces';

// Hooks
import { useGetProjectMembersQuery, useUpdateRoleMemberMutation } from '@/features/projects/store/member.api.slice';
import useProjectId from '@/features/projects/hooks/useProjectId';
import { useRemoveMember } from '@/features/projects/hooks/useRemoveMember';
import useDialogAlert from '@/common/base/BaseDialogAlert/useDialogAlert';
import { useAppDispatch } from '@/common/store';
import { invalidateTags } from '@/features/projects/store/project.api.slice';

export interface IProjectMemberListProps {
  hideSelectOption?: boolean;
}

const roleExample = [
  { text: 'OWNER', value: 'OWNER' },
  { text: 'MAINTAINER', value: 'MAINTAINER' },
  { text: 'DEVELOPER', value: 'DEVELOPER' },
  { text: 'SUBMITTER', value: 'SUBMITTER' },
];

const renderCellRole = (
  params: GridRenderCellParams<IProjectMember>,
  hideSelectOption: boolean,
  handleChange: TFunctionReturnFunction<string, string, void>,
) => (
  <>
    <Typography>{params.row?.role.name ?? params.value}</Typography>
    {!hideSelectOption && params.row && (
      <TableMenuSelection
        list={roleExample}
        currentValue={params.value}
        handleChange={handleChange(params.row._id)}
        IconProps={{ sx: { bgcolor: 'transparent' } }}
      />
    )}
  </>
);

const headers: GridColDef<IProjectMember>[] = [
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
];

const ProjectMemberList = ({ hideSelectOption }: IProjectMemberListProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(invalidateTags(['Member']));
  }, [dispatch]);

  const { data: projectData, projectId } = useProjectId();
  const { isFetching, data } = useGetProjectMembersQuery(projectId || skipToken);
  const [updateRoleMember, { isLoading }] = useUpdateRoleMemberMutation();
  const { deleteLeaveMember, loading, profileData } = useRemoveMember(projectId);
  const { openDialogWarning, closeDialogAlert, dialogAlertOpt } = useDialogAlert();

  const onChangeRole = useCallback(
    (userId?: string) => async (roleName: string) => {
      if (userId) {
        const response = await updateRoleMember({ id: projectId, body: { userId, roleName } }).unwrap();
        if (response.data.message) toast.success('Successfully change role member');
      }
    },
    [projectId, updateRoleMember],
  );

  const openDialogDeleteLeaveWarning = useCallback(
    (row: IProjectMember) => {
      const dialogMessage = `Are you sure you want to ${
        profileData?.data._id === row._id ? 'leave project' : 'delete this member'
      }?`;
      openDialogWarning('Warning', dialogMessage, {
        handleCancel: closeDialogAlert,
        handleOk: (() => deleteLeaveMember(row, closeDialogAlert)) as TFunctionVoid,
      });
    },
    [closeDialogAlert, deleteLeaveMember, openDialogWarning, profileData],
  );

  const tableHeaders: GridColDef<IProjectMember>[] = [
    ...headers,
    {
      headerName: 'Role',
      field: 'role',
      valueGetter: (param) => param.row?.role?.name ?? '-',
      width: 200,
      editable: true,
      renderCell: (param) => renderCellRole(param, !!hideSelectOption, onChangeRole),
    },
    {
      headerName: 'Action',
      field: 'action',
      sortable: false,
      width: 70,
      renderCell: ({ row }) => {
        if (hideSelectOption && row._id !== profileData?.data?._id) return <span>-</span>;
        return (
          <TableAction hideEdit hideView hideDelete>
            <MenuItem onClick={() => openDialogDeleteLeaveWarning(row)}>
              {profileData?.data._id === row._id ? 'Leave Project' : 'Delete'}
            </MenuItem>
          </TableAction>
        );
      },
    },
  ];

  return (
    <>
      <TableHeader header={<Typography fontWeight="bold">{projectData?.data.name}</Typography>} />
      <Box sx={{ height: 20 }} />
      <DataTable
        rows={data ?? []}
        rowCount={undefined}
        pagination={undefined}
        paginationMode={undefined}
        hideFooterPagination
        sortingMode="client"
        columns={tableHeaders}
        loading={isFetching || isLoading || loading}
        getRowId={(row) => row._id}
        editMode={undefined}
      />
      <BaseDialogAlert {...dialogAlertOpt} />
    </>
  );
};

export default ProjectMemberList;
