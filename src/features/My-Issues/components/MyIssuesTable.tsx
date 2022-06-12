// MUI Components
import { Box } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// Constants
import { TableAction, TableHeader, TableCellStatus, TableCellLevel, DataTable } from '@/common/base';

import { TableAndSearchProps } from '@/types';
import { StatusType } from '@/common/constants/status';
import { LevelType } from '@/common/constants/level';

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

  return (
    <>
      <TableHeader isUsingSearch TextFieldProps={SearchProps} />
      <Box sx={{ height: 20 }} />
      <DataTable rows={[]} columns={tableHeaders} {...TableProps} />
    </>
  );
};

export default MyIssuesTable;
