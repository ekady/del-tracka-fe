// MUI Components
import { Box, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// Local Components
import { TableHeader, TableMenuSelection } from '@/common/base';
import { DataGridStyled } from '@/common/base/DataTable/styled';

interface Indexable {
  [index: string]: string;
}

export type ProjectMemberListType = {
  id: string;
  name: string;
  dateAdded: string;
  addedBy: string;
  role: string;
  roleName: string;
};

export interface ProjectMemberListProps {
  hideSelectOption?: boolean;
}

function createData({ id, name, dateAdded, addedBy, role, roleName }: ProjectMemberListType): Indexable {
  return { id, name, dateAdded, addedBy, role, roleName };
}

const roleExample = [
  { text: 'Admin', value: 'ADMIN' },
  { text: 'Maintainer', value: 'MAINTAINER' },
  { text: 'Developer', value: 'DEVELOPER' },
  { text: 'Submitter', value: 'SUBMITTER' },
];

export default function ProjectMemberList({ hideSelectOption }: ProjectMemberListProps) {
  const onChangeRole = (role: string) => {
    console.log(role);
  };

  const renderCellRole = (params: GridRenderCellParams<string>) => (
    <>
      <Typography>{params.row?.roleName ?? params.value}</Typography>
      {!hideSelectOption && (
        <TableMenuSelection
          list={roleExample}
          currentValue={params.value}
          handleChange={onChangeRole}
          IconProps={{ sx: { bgcolor: 'transparent' } }}
        />
      )}
    </>
  );

  const tableHeaders: GridColDef[] = [
    { headerName: 'Name', field: 'name', width: 120 },
    { headerName: 'Date Added', field: 'dateAdded', width: 300 },
    { headerName: 'Added By', field: 'addedBy', width: 200 },
    { headerName: 'Role', field: 'role', width: 200, editable: true, renderCell: renderCellRole },
  ];

  const rows = [
    createData({ id: '1', name: 'Diyos', dateAdded: '2022-12-12', addedBy: '-', role: 'ADMIN', roleName: 'Admin' }),
    createData({ id: '2', name: 'Chixi', dateAdded: '2022-12-12', addedBy: 'Diyos', role: 'MAINTAINER', roleName: 'Maintainer' }),
    createData({ id: '3', name: 'Siao', dateAdded: '2022-12-12', addedBy: 'Diyos', role: 'MAINTAINER', roleName: 'Maintainer' }),
    createData({ id: '4', name: 'Spiv', dateAdded: '2022-12-12', addedBy: 'Siao', role: 'DEVELOPER', roleName: 'Developer' }),
    createData({ id: '5', name: 'Max', dateAdded: '2022-12-12', addedBy: 'Chixi', role: 'SUBMITTER', roleName: 'Submitter' }),
  ];
  return (
    <>
      <TableHeader header={<Typography fontWeight="bold">Health Care Member</Typography>} isUsingSearch />
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
        sx={{ zIndex: 1 }}
        disableVirtualization
      />
    </>
  );
}
