// React
import { ReactNode } from 'react';

// MUI Utils
import { styled } from '@mui/material/styles';

// MUI Components
import { TextField, InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

// MUI Icons
import { SearchRounded } from '@mui/icons-material/';

// Local Icon
import TableNoData from './TableNoData';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
}));

export type TypeTableBaseHeaders = {
  name: string;
  value: string;
};

export interface TableBaseProps {
  isUsingSearch?: boolean;
  isUsingPagination?: boolean;
  tableHeaders: TypeTableBaseHeaders[];
  tableRows?: any[];
  rowId?: string;
  children?: ReactNode;
  header?: ReactNode;
  rowClick?: (id: string | number) => void;
}

export default function TableBase({ header, isUsingSearch, tableHeaders, tableRows, children, rowId, rowClick }: TableBaseProps) {
  const clickedRow = rowClick
    ? rowClick
    : () => {
        return;
      };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <>{header ? header : null}</>
        {isUsingSearch && (
          <TextField
            placeholder="Search"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded />
                </InputAdornment>
              ),
            }}
          />
        )}
      </Box>
      <TableContainer component={Box}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((item) => (
                <StyledTableCell key={item.value}>{item.name}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {children ? (
              children
            ) : tableRows && tableRows.length ? (
              tableRows.map((row) => (
                <StyledTableRow key={rowId ? row[rowId] : row.id} onClick={() => clickedRow(row.id)}>
                  {tableHeaders.map((item) => (
                    <StyledTableCell key={item.value}>{row[item.value]}</StyledTableCell>
                  ))}
                </StyledTableRow>
              ))
            ) : (
              <TableNoData tableHeaders={tableHeaders} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
