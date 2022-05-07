// MUI Components
import { Box, Button, Chip } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// Local Component
import { TableAction, TableHeader } from '@/common/base';
import { level } from '@/common/constants';
import ProjectIssueChangeStatus from './ProjectIssueChangeStatus';
import { DataGridStyled } from '@/common/base/DataTable/styled';

// Constants
import status from '@/common/constants/status';
import { AddCircleOutlined } from '@mui/icons-material';

interface Indexable {
  [index: string]: string;
}

export type ProjectIssueType = {
  id: string;
  level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'NORMAL' | 'LOW';
  status: 'OPEN' | 'IN_PROGRESS' | 'REQUEST_REVIEW' | 'UNDER_REVIEW' | 'HOLD' | 'CLOSE';
  bugNumber: string;
  mainProblem: string;
  feature: string;
  dateUpdated: string;
  reporter: string;
  assigneeAvatar: string;
};

function createData(
  id: string,
  level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'NORMAL' | 'LOW',
  status: 'OPEN' | 'IN_PROGRESS' | 'REQUEST_REVIEW' | 'UNDER_REVIEW' | 'HOLD' | 'CLOSE',
  bugNumber: string,
  mainProblem: string,
  feature: string,
  dateUpdated: string,
  reporter: string,
  assigneeAvatar: string,
): Indexable {
  return { id, level, status, bugNumber, mainProblem, feature, dateUpdated, reporter, assigneeAvatar };
}

export default function ProjectIssueTable() {
  const renderCellStatus = (params: GridRenderCellParams<string>) => (
    <Chip
      label={params.value ? status[params.value].name : ''}
      sx={{
        background: params.value ? status[params.value].color : '',
        color: params.value ? status[params.value].textColor : '',
        border: '1px solid #ccc',
        width: 150,
        fontWeight: 'bold',
        justifyContent: 'space-between',
      }}
      onDelete={() => {
        //
      }}
      deleteIcon={<ProjectIssueChangeStatus currentStatus={params.value ?? ''} />}
    />
  );
  const renderCellLevel = (params: GridRenderCellParams<string>) => (
    <Chip
      label={params.value ?? ''}
      sx={{
        background: params.value ? level[params.value].color : 'white',
        color: params.value ? level[params.value].textColor : 'black',
        border: '1px solid #ccc',
        width: 130,
        fontWeight: 'bold',
        justifyContent: 'center',
      }}
    />
  );
  const renderCellAction = () => <TableAction />;

  const tableHeaders: GridColDef[] = [
    { headerName: 'Bug Number', field: 'bugNumber', width: 120, align: 'center' },
    { headerName: 'Main Problem', field: 'mainProblem', width: 300 },
    { headerName: 'Feature', field: 'feature', width: 200 },
    { headerName: 'Level', field: 'level', width: 200, renderCell: renderCellLevel },
    { headerName: 'Date Updated', field: 'dateUpdated', width: 200 },
    { headerName: 'Reporter', field: 'reporter', width: 200 },
    { headerName: 'Assignee', field: 'assigneeAvatar' },
    { headerName: 'Status', field: 'status', width: 200, renderCell: renderCellStatus },
    { headerName: 'Action', field: 'action', sortable: false, width: 70, renderCell: renderCellAction },
  ];

  const rows = [
    createData(
      '1',
      'CRITICAL',
      'OPEN',
      '01',
      'Cannot be saved Cannot be saved Cannot be saved Cannot be saved',
      'Profile',
      '2021-01-01',
      'Reporter',
      'Chixi',
    ),
    createData('2', 'HIGH', 'IN_PROGRESS', '05', 'Cannot be edited', 'Profile', '2021-01-01', 'Reporter', 'Diyos'),
    createData('3', 'LOW', 'REQUEST_REVIEW', '01', 'Cannot be saved', 'Profile', '2021-01-01', 'Reporter', 'Chixi'),
    createData('4', 'NORMAL', 'UNDER_REVIEW', '05', 'Cannot be edited', 'Profile', '2021-01-01', 'Reporter', 'Diyos'),
    createData('5', 'MEDIUM', 'HOLD', '01', 'Cannot be saved', 'Profile', '2021-01-01', 'Reporter', 'Chixi'),
    createData('6', 'HIGH', 'CLOSE', '05', 'Cannot be edited', 'Profile', '2021-01-01', 'Reporter', 'Diyos'),
  ];

  const buttonAddIssue = (
    <Button variant="contained" color="primary" startIcon={<AddCircleOutlined />}>
      Add New Issue
    </Button>
  );

  return (
    <>
      <TableHeader header={buttonAddIssue} isUsingSearch />
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
      />
    </>
  );
}
