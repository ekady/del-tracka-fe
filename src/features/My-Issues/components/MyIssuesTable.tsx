// MUI Components
import { Box } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// Constants
import { TableAction, TableHeader, TableCellStatus, TableCellLevel } from '@/common/base';
import { DataGridStyled } from '@/common/base/DataTable/styled';

import { Indexable, TableAndSearchProps } from '@/types';
import { StatusType } from '@/common/constants/status';
import { LevelType } from '@/common/constants/level';

function createData(
  id: string,
  mainProblem: string,
  projectName: string,
  dateUpdated: string,
  reporter: string,
  level: string,
  status: string,
): Indexable<string, string> {
  return { id, mainProblem, projectName, dateUpdated, reporter, level, status };
}

const renderCellStatus = (params: GridRenderCellParams<string>) => <TableCellStatus status={params.value as StatusType} />;
const renderCellLevel = (params: GridRenderCellParams<string>) => <TableCellLevel level={params.value as LevelType} />;
const renderCellAction = () => <TableAction />;

const MyIssuesTable = ({ TableProps, SearchProps }: TableAndSearchProps) => {
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
      <TableHeader isUsingSearch TextFieldProps={SearchProps} />
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
        sortingMode="server"
        {...TableProps}
      />
    </>
  );
};

export default MyIssuesTable;
