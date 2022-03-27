// React
import { useState } from 'react';

// Next
import { useRouter } from 'next/router';

// MUI Components
import { Box, IconButton, Typography } from '@mui/material';

// MUI Icons
import { AddCircleOutlined } from '@mui/icons-material';

// Local Component
import { TableBase, BaseDialogAlert } from '@/common/components/base';
import { TypeTableBaseHeaders } from '@/common/components/base/table/TableBase';
import { BaseDialogAlertProps } from '@/common/components/base/BaseDialogAlert';

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

const tableHeaders: TypeTableBaseHeaders[] = [
  { name: 'Sprint', value: 'name' },
  { name: 'Open', value: 'open' },
  { name: 'In Progress', value: 'inProgress' },
  { name: 'Review', value: 'underReview' },
  { name: 'Close', value: 'close' },
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

  const SprintButton = () => (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography fontSize={16}>Sprint</Typography>
      <IconButton color="primary" onClick={openDialogWarning}>
        <AddCircleOutlined />
      </IconButton>
    </Box>
  );

  const redirectSprintPage = (sprintId: string | number) => {
    router.push(`${router.asPath}/${sprintId}`);
  };

  return (
    <>
      <TableBase header={<SprintButton />} tableHeaders={tableHeaders} tableRows={rows} rowClick={redirectSprintPage} />
      <BaseDialogAlert handleCancel={dialogHandler} handleOk={dialogHandler} {...dialogAlertOpt} />
    </>
  );
}
