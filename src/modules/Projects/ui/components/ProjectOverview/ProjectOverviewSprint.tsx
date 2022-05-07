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
import { BaseDialogAlert, TableHeader } from '@/common/base';
import { BaseDialogAlertProps } from '@/common/base/BaseDialogAlert/type';
import { DataGridStyled } from '@/common/base/DataTable/styled';

interface IDictionary {
  [index: string]: string | number;
}

function createData(
  id: string,
  name: string,
  open: string | number,
  inProgress: string | number,
  underReview: string | number,
  close: string | number,
): IDictionary {
  return { id, name, open, inProgress, underReview, close };
}

const rows = [
  createData('3', 'Sprint 3', '12', '2', '23', '45'),
  createData('2', 'Sprint 2', '23', '31', '12', '23'),
  createData('1', 'Sprint 1', '4', '5', '3', '4'),
];

const tableHeaders: GridColDef[] = [
  { headerName: 'Sprint', field: 'name', width: 150 },
  { headerName: 'Open', field: 'open', width: 150 },
  { headerName: 'In Progress', field: 'inProgress', width: 150 },
  { headerName: 'Review', field: 'underReview', width: 150 },
  { headerName: 'Close', field: 'close', width: 150 },
];

export default function ProjectOverviewSprint() {
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
      <TableHeader isUsingSearch header={sprintButton} />
      <Box sx={{ height: 20 }} />
      <DataGridStyled
        rows={rows}
        columns={tableHeaders}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        disableColumnMenu
        autoHeight
        autoPageSize
        rowHeight={60}
        onRowClick={redirectSprintPage}
      />
      <BaseDialogAlert handleCancel={dialogHandler} handleOk={dialogHandler} {...dialogAlertOpt} />
    </>
  );
}
