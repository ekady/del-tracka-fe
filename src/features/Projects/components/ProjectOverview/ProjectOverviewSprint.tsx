// React
import { useCallback, useState } from 'react';

// MUI Components
import { Box, IconButton, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

// MUI Icons
import { AddCircleOutlined } from '@mui/icons-material';

// Local Component
import { BaseDialogAlert, DataTable, TableAction, TableHeader } from '@/common/base';
import ProjectDialogNew from '../ProjectDialogNew';

// Types
import { IProjectRequest, ISprintsResponse } from '../../types';

// Hooks
import useDialogAlert from '@/common/base/BaseDialogAlert/useDialogAlert';
import useProjectId from '../../hooks/useProjectId';
import {
  useCreateUpdateSprintMutation,
  useDeleteSprintMutation,
  useGetSprintInfoQuery,
  useLazyGetSprintQuery,
} from '../../store/sprint.api.slice';

// Constants
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { ProjectRoles } from '../../constant/role';

const tableHeaders: GridColDef[] = [
  { headerName: 'Sprint', field: 'name', width: 150 },
  {
    headerName: 'Open',
    field: 'open',
    valueGetter: (param) => param.row?.tasks?.OPEN ?? 0,
    width: 150,
  },
  {
    headerName: 'In Progress',
    field: 'inProgress',
    valueGetter: (param) => param.row?.tasks?.IN_PROGRESS ?? 0,
    width: 150,
  },
  {
    headerName: 'Review',
    field: 'review',
    valueGetter: (param) => param.row?.tasks?.REVIEW ?? 0,
    width: 150,
  },
  {
    headerName: 'Close',
    field: 'close',
    valueGetter: (param) => param.row?.tasks?.CLOSED ?? 0,
    width: 150,
  },
];

const ProjectOverviewSprint = () => {
  const { projectId, router, refetch, data: projectData } = useProjectId();
  const { data, isLoading } = useGetSprintInfoQuery(projectId ? { idProject: projectId, idSprint: '' } : skipToken);
  const [getSprint] = useLazyGetSprintQuery();
  const [createUpdateSprint, { isLoading: loadingCreateUpdate }] = useCreateUpdateSprintMutation();
  const [deleteSprint] = useDeleteSprintMutation();

  const { dialogAlertOpt, closeDialogAlert, openDialogSuccess, openDialogWarning } = useDialogAlert();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [defaultValues, setDefaultValues] = useState<IProjectRequest>({
    id: undefined,
    description: '',
    name: '',
  });

  const toggleDialog = useCallback(
    async (id?: string) => {
      if (id) {
        const { data: responseData } = await getSprint({ idProject: projectId, idSprint: id });
        setDefaultValues({
          id: responseData?.data.shortId,
          name: responseData?.data.name ?? '',
          description: responseData?.data.description ?? '',
        });
      } else setDefaultValues({ id: undefined, description: '', name: '' });
      setOpenDialog(!openDialog);
    },
    [getSprint, openDialog, projectId],
  );

  const successDialog = useCallback(
    async (data: IProjectRequest, defaultValues?: IProjectRequest) => {
      const payload = {
        id: projectId,
        body: { ...data, id: defaultValues?.id ?? undefined },
      };
      const response = await createUpdateSprint(payload);
      if ('data' in response && response.data.data) {
        openDialogSuccess('Success', `Sprint has successfully ${payload.body.id ? 'updated' : 'created'}`);
        refetch();
        toggleDialog();
      }
    },
    [createUpdateSprint, openDialogSuccess, projectId, refetch, toggleDialog],
  );

  const redirectSprintPage = useCallback(
    (id: string) => {
      router.push(`${router.asPath}/${id ?? ''}`);
    },
    [router],
  );

  const deleteSprintConfirmation = useCallback(
    (sprint: ISprintsResponse) => {
      openDialogWarning('Confirmation', 'Are you sure you want to delete this sprint?', {
        handleCancel: closeDialogAlert,
        handleOk: async () => {
          const data = await deleteSprint({ idProject: projectId, idSprint: sprint.shortId });
          if ('data' in data && data.data?.data) {
            openDialogSuccess('Success', 'Sprint has sucessfully deleted');
          }
        },
      });
    },
    [closeDialogAlert, deleteSprint, openDialogSuccess, openDialogWarning, projectId],
  );

  const headers: GridColDef[] = [
    ...tableHeaders,
    {
      headerName: 'Action',
      field: 'action',
      sortable: false,
      width: 70,
      renderCell: ({ row }) => {
        if (![ProjectRoles.OWNER, ProjectRoles.MAINTAINER].includes(projectData?.data.role as ProjectRoles))
          return <span>-</span>;
        return (
          <TableAction
            handleDelete={() => deleteSprintConfirmation(row)}
            handleEdit={() => toggleDialog(row?.shortId)}
            handleView={() => redirectSprintPage(row?.shortId)}
          />
        );
      },
    },
  ];

  return (
    <>
      <TableHeader
        header={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography fontSize={16}>Sprint</Typography>
            <IconButton color="primary" onClick={() => toggleDialog()}>
              <AddCircleOutlined />
            </IconButton>
          </Box>
        }
      />
      <Box sx={{ height: 20 }} />
      <DataTable
        rows={data?.data ?? []}
        columns={headers}
        sortingMode="client"
        loading={isLoading}
        getRowId={(row) => row.shortId}
        rowCount={undefined}
        pagination={undefined}
        paginationMode={undefined}
        hideFooterPagination
      />
      <BaseDialogAlert handleCancel={closeDialogAlert} {...dialogAlertOpt} loading={loadingCreateUpdate} />
      <ProjectDialogNew
        defaultValues={defaultValues}
        isOpen={openDialog}
        title="Sprint"
        handleCancel={toggleDialog}
        handleOk={successDialog}
      />
    </>
  );
};

export default ProjectOverviewSprint;
