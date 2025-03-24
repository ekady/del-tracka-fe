'use client';

// React
import { useCallback, useState } from 'react';

// MUI Components
import Link from 'next/link';

import { People, Settings } from '@mui/icons-material';
import Sync from '@mui/icons-material/Sync';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

import DataTable from '@/app/_common/base/DataTable';
import TableAction from '@/app/_common/base/TableAction';
import TableHeader from '@/app/_common/base/TableHeader';
import { IProjectWithPermissions } from '@/app/app/projects/_interfaces';

import ProjectDialogCreateEditForm, { IProjectDialogCreateEditFormProps } from './ProjectDialogCreateEditForm';
import { revalidateProjectListTag } from '../_actions/project.action';

interface IProjectListProps {
  projects: IProjectWithPermissions[];
}

const tableHeaders: GridColDef<IProjectWithPermissions>[] = [
  { headerName: 'Name', field: 'name', width: 300 },
  { headerName: 'Role', field: 'role', width: 200 },
  {
    headerName: 'Latest Sprint',
    field: 'stages',
    renderCell: (value) => {
      const stagesLength = value.row?.stages?.length ?? 1;
      return value.row?.stages?.[stagesLength - 1]?.name ?? '-'
    },
    width: 200,
  },
];

const ProjectList = ({ projects }: IProjectListProps) => {
  const [dialogCreateEdit, setDialogCreateEdit] = useState<IProjectDialogCreateEditFormProps>({});

  const closeDialogCreateEdit = useCallback(() => {
    setDialogCreateEdit({ ...dialogCreateEdit, isOpen: false });
  }, [setDialogCreateEdit, dialogCreateEdit]);

  const openDialogCreateEdit = useCallback(
    (defaultValue: IProjectWithPermissions | null) => {
      setDialogCreateEdit({
        isOpen: true,
        isEdit: !!defaultValue?.id,
        id: defaultValue?.shortId,
        defaultValues: defaultValue?.id
          ? { name: defaultValue.name, description: defaultValue.description }
          : { name: '', description: '' },
      });
    },
    [setDialogCreateEdit],
  );

  const renderTableAction = (params: GridRenderCellParams<IProjectWithPermissions>) => (
    <TableAction
      hideDelete
      hideEdit={!params.row.rolePermissions?.PROJECT?.update}
      toView={`/app/projects/${params.row.shortId}`}
      handleEdit={() => openDialogCreateEdit(params.row)}
    >
      {params.row.rolePermissions?.PROJECT?.update ? (
        <IconButton LinkComponent={Link} href={`/app/projects/${params.row.shortId}/settings`} size="small">
          <Settings />
        </IconButton>
      ) : (
        <IconButton LinkComponent={Link} href={`/app/projects/${params.row.shortId}/member`} size="small">
          <People />
        </IconButton>
      )}
    </TableAction>
  );
  const headers: GridColDef<IProjectWithPermissions>[] = [
    { headerName: 'Action', field: 'action', sortable: false, width: 130, renderCell: renderTableAction },
    ...tableHeaders,
  ];

  return (
    <>
      <Box>
        <TableHeader isUsingSearch={false}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="contained" onClick={() => openDialogCreateEdit(null)}>
              Add Project
            </Button>
            <Button variant="outlined" onClick={() => revalidateProjectListTag()}>
              <Sync />
            </Button>
          </Box>
        </TableHeader>
      </Box>

      <Box sx={{ height: 40 }} />

      <DataTable
        rows={projects}
        columns={headers}
        getRowId={(val) => val.shortId}
        rowCount={undefined}
        pagination={undefined}
        paginationMode={undefined}
        hideFooterPagination
      />

      <ProjectDialogCreateEditForm {...dialogCreateEdit} onClose={closeDialogCreateEdit} />
    </>
  );
};

export default ProjectList;
