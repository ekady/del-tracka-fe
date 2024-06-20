'use client';

// React
import { useCallback, useState } from 'react';

// MUI Components
import Sync from '@mui/icons-material/Sync';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { toast } from 'react-toastify';

import BaseDialogAlert from '@/app/_common/base/BaseDialogAlert';
import useDialogAlert from '@/app/_common/base/BaseDialogAlert/useDialogAlert';
import DataTable from '@/app/_common/base/DataTable';
import TableAction from '@/app/_common/base/TableAction';
import TableHeader from '@/app/_common/base/TableHeader';
import { TFunctionVoid } from '@/app/_common/types';
import {
  actionDeleteSprint,
  revalidateSprintListTag,
  revalidatProjectActivityTag,
} from '@/app/app/projects/[id]/_actions/projectId.action';
import { IProjectWithPermissions, ISprintsResponse } from '@/app/app/projects/_interfaces';

import SprintDialogCreateEditForm, { ISprintDialogCreateEditFormProps } from './SprintDialogCreateEditForm';

interface ISprintListProps {
  projectId: string;
  project: IProjectWithPermissions | null;
  sprints: ISprintsResponse[];
}

const tableHeaders: GridColDef<ISprintsResponse>[] = [
  {
    headerName: 'Total',
    field: 'total',
    renderCell: (params) => Object.values(params.row?.tasks).reduce((sum, curr) => sum + curr, 0),
  },
  {
    headerName: 'Open',
    field: 'open',
    renderCell: (params) => params.row?.tasks?.OPEN ?? 0,
  },
  {
    headerName: 'In Progress',
    field: 'inProgress',
    renderCell: (params) => params.row?.tasks?.IN_PROGRESS ?? 0,
  },
  {
    headerName: 'Ready',
    field: 'ready',
    renderCell: (params) => params.row?.tasks?.READY_FOR_TEST ?? 0,
  },
  {
    headerName: 'Review',
    field: 'review',
    renderCell: (params) => params.row?.tasks?.REVIEW ?? 0,
  },
  {
    headerName: 'Failed',
    field: 'failed',
    renderCell: (params) => params.row?.tasks?.FAILED ?? 0,
  },
  {
    headerName: 'Close',
    field: 'close',
    renderCell: (params) => params.row?.tasks?.CLOSED ?? 0,
  },
  {
    headerName: 'Hold',
    field: 'hold',
    renderCell: (params) => params.row?.tasks?.HOLD ?? 0,
  },
];

const SprintList = ({ projectId, project, sprints }: ISprintListProps) => {
  const [dialogCreateEdit, setDialogCreateEdit] = useState<ISprintDialogCreateEditFormProps>({ projectId });
  const { dialogAlertOpt, closeDialogAlert, openDialogSuccess, openDialogWarning } = useDialogAlert();
  const [loading, setLoading] = useState(false);

  const closeDialogCreateEdit = useCallback(() => {
    setDialogCreateEdit({ ...dialogCreateEdit, isOpen: false });
  }, [setDialogCreateEdit, dialogCreateEdit]);

  const openDialogCreateEdit = useCallback(
    (defaultValue: ISprintsResponse | null) => {
      setDialogCreateEdit({
        isOpen: true,
        isEdit: !!defaultValue?.shortId,
        projectId,
        sprintId: defaultValue?.shortId,
        defaultValues: defaultValue?.shortId
          ? { name: defaultValue.name, description: defaultValue.description }
          : { name: '', description: '' },
      });
    },
    [projectId],
  );

  const deleteSprint = useCallback(
    async (sprintId: string) => {
      setLoading(true);
      try {
        const data = await actionDeleteSprint({ projectId, sprintId });

        if (data.isSuccess) {
          openDialogSuccess('Success', 'Sprint has sucessfully deleted');
          revalidateSprintListTag(projectId);
          revalidatProjectActivityTag(projectId);
        }

        if (data.isError) {
          toast.error(data.message);
        }
      } finally {
        setLoading(false);
      }
    },
    [openDialogSuccess, projectId],
  );

  const openDialogDeleteConfirmation = useCallback(
    (sprint: ISprintsResponse) => {
      openDialogWarning('Confirmation', 'Are you sure you want to delete this sprint?', {
        handleCancel: closeDialogAlert,
        handleOk: (() => deleteSprint(sprint.shortId)) as TFunctionVoid,
      });
    },
    [closeDialogAlert, deleteSprint, openDialogWarning],
  );

  const renderTableAction = (params: GridRenderCellParams<ISprintsResponse>) => (
    <TableAction
      toView={`/app/projects/${projectId}/${params.row.shortId}`}
      hideEdit={!project?.rolePermissions?.PROJECT?.update}
      handleEdit={() => openDialogCreateEdit(params.row)}
      hideDelete={!project?.rolePermissions?.STAGE?.delete}
      handleDelete={() => openDialogDeleteConfirmation(params.row)}
    />
  );
  const headers: GridColDef<ISprintsResponse>[] = [
    { headerName: 'Action', field: 'action', sortable: false, width: 170, renderCell: renderTableAction },
    { headerName: 'Name', field: 'name', sortable: false, width: 170 },
    ...tableHeaders,
  ];

  return (
    <>
      <TableHeader isUsingSearch={false}>
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <Typography variant="h6">Sprint List</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={() => openDialogCreateEdit(null)}>
              Add Sprint
            </Button>
            <Button variant="outlined" onClick={() => revalidateSprintListTag(projectId)}>
              <Sync />
            </Button>
          </Box>
        </Box>
      </TableHeader>

      <Box sx={{ height: 20 }} />

      <DataTable
        rows={sprints}
        columns={headers}
        getRowId={(val) => val.shortId}
        rowCount={undefined}
        pagination={undefined}
        paginationMode={undefined}
        hideFooterPagination
      />

      <SprintDialogCreateEditForm {...dialogCreateEdit} onClose={closeDialogCreateEdit} />
      <BaseDialogAlert handleCancel={closeDialogAlert} {...dialogAlertOpt} loading={loading} />
    </>
  );
};

export default SprintList;
