// MUI Components
import { Box, Button } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

// MUI Icons
import { AddCircleOutlined } from '@mui/icons-material';

// Local Component
import { DataTable, TableAction, TableCellLevel, TableCellStatus, TableHeader } from '@/common/base';
import ProjectIssueChangeStatus from './ProjectIssueChangeStatus';

// Types
import { TableAndSearchProps } from '@/common/types';

import { StatusType } from '@/common/constants/status';
import { LevelType } from '@/common/constants/level';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ProjectIssueTable = ({ SearchProps, TableProps }: TableAndSearchProps) => {
  const router = useRouter();
  const renderCellStatus = (params: GridRenderCellParams<string>) => (
    <TableCellStatus
      SelectOption={<ProjectIssueChangeStatus currentStatus={params.value ?? ''} />}
      status={params.value as StatusType}
    />
  );
  const renderCellLevel = (params: GridRenderCellParams<string>) => (
    <TableCellLevel level={params.value as LevelType} />
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

  const buttonAddIssue = (
    <Link href={`${router.asPath}/new-issue`} passHref>
      <Button variant="contained" color="primary" startIcon={<AddCircleOutlined />}>
        Add New Issue
      </Button>
    </Link>
  );

  return (
    <>
      <TableHeader header={buttonAddIssue} isUsingSearch TextFieldProps={SearchProps} />
      <Box sx={{ height: 20 }} />
      <DataTable rows={[]} columns={tableHeaders} {...TableProps} />
    </>
  );
};

export default ProjectIssueTable;
