'use client';

import { useCallback } from 'react';

// MUI Components

// Toastify
import { useRouter } from 'next/navigation';

import { Delete, Logout } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { toast } from 'react-toastify';

import BaseDialogAlert from '@/app/_common/base/BaseDialogAlert';
import useDialogAlert from '@/app/_common/base/BaseDialogAlert/useDialogAlert';
import DataTable from '@/app/_common/base/DataTable';
import TableAction from '@/app/_common/base/TableAction';
import TableMenuSelection from '@/app/_common/base/TableMenuSelection';
import { IUserInfoResponse, TFunctionReturnFunction, TFunctionVoid } from '@/app/_common/types';
import {
  actionDeleteMember,
  actionLeaveProject,
  actionUpdateRoleMember,
  revalidateMemberListTag,
} from '@/app/app/projects/[id]/member/_actions/projectMember.action';
import MemberAddForm from '@/app/app/projects/[id]/member/_components/MemberAddForm';
import { revalidateProjectTag } from '@/app/app/projects/_actions/project.action';
import { IProjectMember, IProjectWithPermissions } from '@/app/app/projects/_interfaces';

export interface IMemberListProps {
  memberList: IProjectMember[];
  project: IProjectWithPermissions | null;
  projectId: string;
  profile: IUserInfoResponse | null;
}

const roleExample = [
  { text: 'OWNER', value: 'OWNER' },
  { text: 'MAINTAINER', value: 'MAINTAINER' },
  { text: 'DEVELOPER', value: 'DEVELOPER' },
  { text: 'SUBMITTER', value: 'SUBMITTER' },
];

const renderCellRole = (
  params: GridRenderCellParams<IProjectMember>,
  project: IProjectWithPermissions | null,
  handleChange: TFunctionReturnFunction<string, string, void>,
) => (
  <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
    {project?.rolePermissions?.MEMBER?.update
      ? params.row && (
          <>
            <Typography>{params.row?.role.name ?? params.value}</Typography>
            <TableMenuSelection
              list={roleExample}
              currentValue={params.value}
              handleChange={handleChange(params.row._id)}
              IconProps={{ sx: { bgcolor: 'transparent' } }}
            />
          </>
        )
      : params.row?.role.name ?? params.value}
  </Box>
);

const headers: GridColDef<IProjectMember>[] = [
  {
    headerName: 'Name',
    field: 'name',
    renderCell: (param) => `${param.row?.firstName} ${param.row?.lastName}`,
    width: 180,
  },
  {
    headerName: 'Date Added',
    field: 'createdAt',
    renderCell: (param) => new Date(param.row.createdAt).toLocaleDateString(),
    width: 150,
  },
  {
    headerName: 'Added By',
    field: 'createdBy',
    width: 200,
    renderCell: (param) => `${param.row?.createdBy.firstName} ${param.row?.createdBy.lastName}`,
  },
];

const MemberList = ({ memberList, project, projectId, profile }: IMemberListProps) => {
  const revalidateMemberList = revalidateMemberListTag.bind(null, projectId);
  const revalidateProject = revalidateProjectTag.bind(null, projectId);

  const { openDialogWarning, closeDialogAlert, dialogAlertOpt } = useDialogAlert();
  const router = useRouter();

  const onChangeRole = useCallback(
    (userId?: string) => async (roleName: string) => {
      if (userId) {
        const response = await actionUpdateRoleMember({ projectId }, { userId, roleName });
        if (response.isSuccess) {
          revalidateMemberList();
          toast.success('Successfully change role member');
        }
        if (response.isError) toast.error(response.message);
      }
    },
    [projectId, revalidateMemberList],
  );

  const deleteMember = useCallback(
    async (userId: string) => {
      const response = await actionDeleteMember({ projectId }, { userId });

      closeDialogAlert();

      if (response.isSuccess) {
        revalidateMemberList();
        revalidateProject();

        if (profile?._id === userId) toast.success('Successfully left this project');
        else toast.success('Successfully delete a member member');
      }

      if (response.isError) toast.error(response.message);
    },
    [closeDialogAlert, profile?._id, projectId, revalidateMemberList, revalidateProject],
  );

  const leaveProject = useCallback(async () => {
    const response = await actionLeaveProject({ projectId });

    if (response.isSuccess) {
      revalidateMemberList();
      revalidateProject();

      toast.success('Successfully left this project');
      router.push('/app/projects');
    }

    if (response.isError) toast.error(response.message);
    closeDialogAlert();
  }, [closeDialogAlert, projectId, revalidateMemberList, revalidateProject, router]);

  const openDialogDeleteLeaveWarning = useCallback(
    (row: IProjectMember) => {
      const dialogMessage = `Are you sure you want to ${
        profile?._id === row._id ? 'leave project' : 'delete this member'
      }?`;
      openDialogWarning('Warning', dialogMessage, {
        handleCancel: closeDialogAlert,
        handleOk: (() => {
          if (profile?._id === row._id) leaveProject();
          else deleteMember(row._id);
        }) as TFunctionVoid,
      });
    },
    [closeDialogAlert, deleteMember, leaveProject, openDialogWarning, profile?._id],
  );

  const tableHeaders: GridColDef<IProjectMember>[] = [
    ...headers,
    {
      headerName: 'Role',
      field: 'role',
      width: 200,
      editable: true,
      renderCell: (param) => renderCellRole(param, project, onChangeRole),
    },
    {
      headerName: 'Action',
      field: 'action',
      sortable: false,
      width: 70,
      renderCell: ({ row }) => {
        if (!project?.rolePermissions?.MEMBER?.update && row._id !== profile?._id) return <span>-</span>;
        return (
          <TableAction hideEdit hideView hideDelete>
            <IconButton onClick={() => openDialogDeleteLeaveWarning(row)} size="small">
              {profile?._id === row._id ? <Logout /> : <Delete />}
            </IconButton>
          </TableAction>
        );
      },
    },
  ];

  return (
    <>
      {project?.rolePermissions?.MEMBER?.create && <MemberAddForm projectId={projectId} />}
      <DataTable
        rows={memberList}
        rowCount={undefined}
        pagination={undefined}
        paginationMode={undefined}
        hideFooterPagination
        sortingMode="client"
        columns={tableHeaders}
        getRowId={(row) => row._id}
        editMode={undefined}
      />
      <BaseDialogAlert {...dialogAlertOpt} />
    </>
  );
};

export default MemberList;
