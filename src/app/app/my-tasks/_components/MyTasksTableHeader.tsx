'use client';

import { useSearchParams } from 'next/navigation';

import { Typography } from '@mui/material';

import TableHeader from '@/app/_common/base/TableHeader';
import { useTableChange } from '@/app/_common/hooks/useTableChange.hook';

const MyTasksTableHeader = () => {
  const { onSearchChange } = useTableChange();
  const searchParams = useSearchParams();
  return (
    <TableHeader isUsingSearch TextFieldProps={{ onChange: onSearchChange, defaultValue: searchParams.get('search') }}>
      <Typography variant="h6">My Tasks</Typography>
    </TableHeader>
  );
};

export default MyTasksTableHeader;
