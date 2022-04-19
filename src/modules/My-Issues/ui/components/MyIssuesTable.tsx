// MUI Components
import { Box, Chip } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// Constants
import { level } from '@/common/constants';
import status from '@/common/constants/status';
import { StyledDataTable, TableAction, TableHeader } from '@/common/components/base';

interface IDictionary {
  [index: string]: string;
}

function createData(
  id: string,
  mainProblem: string,
  projectName: string,
  dateUpdated: string,
  reporter: string,
  level: string,
  status: string,
): IDictionary {
  return { id, mainProblem, projectName, dateUpdated, reporter, level, status };
}

const renderCellStatus = (params: GridRenderCellParams<string>) => (
  <Chip
    label={params.value ? status[params.value].name : ''}
    sx={{
      background: params.value ? status[params.value].color : 'white',
      color: params.value ? status[params.value].textColor : 'black',
      border: '1px solid #ccc',
      width: 130,
      fontWeight: 'bold',
      justifyContent: 'center',
    }}
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

export default function MyIssuesTable() {
  const tableHeaders: GridColDef[] = [
    { headerName: 'Main Problem', field: 'mainProblem', width: 300 },
    { headerName: 'Project Name', field: 'projectName', width: 200 },
    { headerName: 'Date Updated', field: 'dateUpdated', width: 200 },
    { headerName: 'Reporter', field: 'reporter', width: 200 },
    { headerName: 'Level', field: 'level', width: 200, renderCell: renderCellLevel },
    { headerName: 'Status', field: 'status', width: 200, renderCell: renderCellStatus },
    { headerName: 'Action', field: 'action', sortable: false, width: 70, renderCell: renderCellAction },
  ];

  const rows = [
    createData('1', 'Frozen yoghurt', 'User', '2021-01-01', 'Reporter', 'HIGH', 'IN_PROGRESS'),
    createData('2', 'Frozen yoghurt', 'User', '2021-01-01', 'Reporter', 'CRITICAL', 'IN_PROGRESS'),
    createData('3', 'Frozen yoghurt', 'User', '2021-01-01', 'Reporter', 'LOW', 'REQUEST_REVIEW'),
    createData('4', 'Frozen yoghurt', 'User', '2021-01-01', 'Reporter', 'NORMAL', 'IN_PROGRESS'),
  ];

  return (
    <>
      <TableHeader isUsingSearch />
      <Box sx={{ height: 20 }} />
      <StyledDataTable
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
