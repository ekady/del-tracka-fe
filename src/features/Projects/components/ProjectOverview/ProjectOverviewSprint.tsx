// React
import { useState } from 'react';

// Next
import { useRouter } from 'next/router';

// MUI Components
import { Box, IconButton, Typography } from '@mui/material';
import { GridColDef, GridRowParams } from '@mui/x-data-grid';

// MUI Icons
import { AddCircleOutlined } from '@mui/icons-material';

// Local Component
import { BaseDialogAlert, DataTable, TableHeader } from '@/common/base';

// Types
import { BaseDialogAlertProps } from '@/common/base/BaseDialogAlert';
import { SprintType } from '../../types';

const tableHeaders: GridColDef[] = [
  { headerName: 'Sprint', field: 'name', width: 150 },
  { headerName: 'Open', field: 'open', width: 150 },
  { headerName: 'In Progress', field: 'inProgress', width: 150 },
  { headerName: 'Review', field: 'review', width: 150 },
  { headerName: 'Close', field: 'close', width: 150 },
];

export type ProjectOverviewSprintProps = {
  data: SprintType[];
  loading?: boolean;
};

const ProjectOverviewSprint = ({ data, loading }: ProjectOverviewSprintProps) => {
  const [dialogAlertOpt, setDialogAlertOpt] = useState<BaseDialogAlertProps>({
    isOpen: false,
    type: 'success',
    titleDialog: 'Success',
    description: 'New Project has been added',
    notUsingCancel: true,
  });
  const router = useRouter();

  const dialogHandler = () => {
    setDialogAlertOpt({ ...dialogAlertOpt, isOpen: false });
  };

  const openDialogSuccess = (description?: string) => {
    setDialogAlertOpt({
      ...dialogAlertOpt,
      isOpen: true,
      type: 'success',
      titleDialog: 'Success',
      description,
      subDescription: '',
      notUsingCancel: true,
    });
  };

  const openDialogWarning = () => {
    setDialogAlertOpt({
      ...dialogAlertOpt,
      isOpen: true,
      type: 'warning',
      titleDialog: 'Add New Sprint',
      description: 'Are you sure want to add new sprint?',
      subDescription: 'Next sprint will be Sprint 4',
      notUsingCancel: false,
      handleOk: () => openDialogSuccess('New Sprint has been added'),
    });
  };

  const sprintButton = (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography fontSize={16}>Sprint</Typography>
      <IconButton color="primary" onClick={openDialogWarning}>
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
        rows={data}
        columns={tableHeaders}
        onRowClick={redirectSprintPage}
        paginationMode="client"
        sortingMode="client"
        rowCount={undefined}
        loading={loading}
      />
      <BaseDialogAlert handleCancel={dialogHandler} handleOk={dialogHandler} {...dialogAlertOpt} />
    </>
  );
};

export default ProjectOverviewSprint;
