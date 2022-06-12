// MUI Components
import { Box, IconButton, Typography } from '@mui/material';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';

// MUI Icons
import { AddCircleOutlined } from '@mui/icons-material';

// Local Component
import { BaseDialogAlert, DataTable, TableHeader } from '@/common/base';

// Types
import { SprintType } from '../../types';

import { toast } from 'react-toastify';

// Hooks
import useDialogAlert from '@/common/base/BaseDialogAlert/useDialogAlert';
import useProjectId from '../../hooks/useProjectId';
import { useCreateNewSprintMutation } from '../../store/project.api.slice';

const tableHeaders: GridColDef[] = [
  { headerName: 'Sprint', field: 'name', width: 150 },
  { headerName: 'Open', field: 'open', width: 150 },
  { headerName: 'In Progress', field: 'inProgress', width: 150 },
  { headerName: 'Review', field: 'review', width: 150 },
  { headerName: 'Close', field: 'close', width: 150 },
];

export type ProjectOverviewSprintProps = {
  sprints: SprintType[];
  loading?: boolean;
};

const ProjectOverviewSprint = ({ sprints, loading }: ProjectOverviewSprintProps) => {
  const { projectId, router, data, refetch } = useProjectId();
  const [addNewSprint, { isLoading }] = useCreateNewSprintMutation();
  const { dialogAlertOpt, closeDialogAlert, openDialogWarning, openDialogSuccess } = useDialogAlert();

  const handleAddNewSprint = async () => {
    try {
      const response = await addNewSprint({
        id: projectId,
        body: { newestSprint: data?.newestSprint ? data.newestSprint + 1 : 1 },
      });
      if ('error' in response) toast.error('An error has occured');
      else {
        openDialogSuccess('Success', 'New sprint has been created', { handleOk: closeDialogAlert });
        refetch();
      }
    } catch {
      //
    }
  };

  const dialogWarning = () => {
    openDialogWarning('Add New Sprint', 'Are you sure you want to add new sprint?', {
      subDescription: `Next sprint will be Sprint ${data && data?.newestSprint ? data.newestSprint + 1 : 1}`,
      handleOk: handleAddNewSprint,
    });
  };

  const sprintButton = (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography fontSize={16}>Sprint</Typography>
      <IconButton color="primary" onClick={dialogWarning}>
        <AddCircleOutlined />
      </IconButton>
    </Box>
  );

  const redirectSprintPage = (params: GridRowParams) => {
    const id = params.id ?? '';
    router.push(`${router.asPath}/${id}`);
  };

  return (
    <>
      <TableHeader header={sprintButton} />
      <Box sx={{ height: 20 }} />
      <DataTable
        rows={sprints}
        columns={tableHeaders}
        onRowClick={redirectSprintPage}
        paginationMode="client"
        sortingMode="client"
        rowCount={undefined}
        loading={loading}
      />
      <BaseDialogAlert handleCancel={closeDialogAlert} {...dialogAlertOpt} loading={isLoading} />
    </>
  );
};

export default ProjectOverviewSprint;
