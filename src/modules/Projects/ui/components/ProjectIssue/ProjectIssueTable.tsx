// MUI Components
import { Box, Button } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// MUI Icons
import { AddCircleOutlined } from '@mui/icons-material';

// Local Component
import { TableAction, TableCellLevel, TableCellStatus, TableHeader } from '@/common/base';
import ProjectIssueChangeStatus from './ProjectIssueChangeStatus';
import { DataGridStyled } from '@/common/base/DataTable/styled';

// Types
import { StatusType } from '@/common/constants/status';
import { LevelType } from '@/common/constants/level';
import { Indexable } from '@/types';

export type ProjectIssueType = {
  id: string;
  level: LevelType;
  status: StatusType;
  bugNumber: string;
  mainProblem: string;
  feature: string;
  dateUpdated: string;
  reporter: string;
  assigneeAvatar: string;
};

function createData(
  id: string,
  level: LevelType,
  status: StatusType,
  bugNumber: string,
  mainProblem: string,
  feature: string,
  dateUpdated: string,
  reporter: string,
  assigneeAvatar: string,
): Indexable<string, string> {
  return { id, level, status, bugNumber, mainProblem, feature, dateUpdated, reporter, assigneeAvatar };
}

const ProjectIssueTable = () => {
  const renderCellStatus = (params: GridRenderCellParams<string>) => (
    <TableCellStatus
      SelectOption={<ProjectIssueChangeStatus currentStatus={params.value ?? ''} />}
      status={params.value as StatusType}
    />
  );
  const renderCellLevel = (params: GridRenderCellParams<string>) => <TableCellLevel level={params.value as LevelType} />;
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
};

export default ProjectIssueTable;
