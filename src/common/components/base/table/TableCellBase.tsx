// React
import { ReactNode, useState } from 'react';

// MUI Components
import { TableCell, styled, TableSortLabel, Box } from '@mui/material';
import { tableCellClasses, TableCellProps } from '@mui/material/TableCell';

// MUI Utils
import { visuallyHidden } from '@mui/utils';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    fontWeight: 'bold',
    fontSize: 12,
    border: 'none',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    borderTop: '1px solid #ddd',
    borderBottom: '1px solid #ddd',
    '&:last-child td, &:last-child th': {
      borderRadius: 20,
    },
  },
}));

export type SortType = 'asc' | 'desc' | '';

export interface TableCellBaseProps {
  isHeader?: boolean;
  sortable?: boolean;
  sortValue?: string;
  handleSort?: (sortBy: string, sortOrder: SortType) => void;
  children?: ReactNode;
  TableCellProps?: TableCellProps;
}

export default function TableCellBase({
  isHeader,
  sortable,
  handleSort,
  TableCellProps,
  sortValue,
  children,
}: TableCellBaseProps) {
  const [sort, setSort] = useState<SortType>('');

  const handleSorting = () => {
    let sortDirection: SortType = '';
    if (sort === '') sortDirection = 'asc';
    else if (sort === 'asc') sortDirection = 'desc';
    else if (sort === 'desc') sortDirection = '';
    handleSort && sortable && sortValue && handleSort(sortValue, sortDirection);
    setSort(sortDirection);
  };
  return (
    <StyledTableCell sortDirection={sort ? sort : false} {...TableCellProps}>
      {sortable && sortValue && isHeader ? (
        <TableSortLabel active={!!sort} direction={sort ? sort : undefined} onClick={() => handleSorting()}>
          {children}
          {sort ? (
            <Box component="span" sx={visuallyHidden}>
              {sort === 'desc' ? 'sorted descending' : 'sorted ascending'}
            </Box>
          ) : null}
        </TableSortLabel>
      ) : (
        children
      )}
    </StyledTableCell>
  );
}
