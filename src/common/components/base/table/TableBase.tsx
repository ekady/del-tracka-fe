// React
import { ReactNode } from 'react';

// MUI Components
import { TextField, InputAdornment, Table, TableBody, TableContainer, TableHead, TableRow, Box } from '@mui/material';

// MUI Icons
import { SearchRounded } from '@mui/icons-material/';

// Local Components
import TableNoData from './TableNoData';
import TableCellBase, { TableCellBaseProps } from './TableCellBase';
import TableRowBase from './TableRowBase';

export type TypeTableBaseHeaders = {
  name: string;
  value: string;
  sortable?: boolean;
  sortValue?: string;
  optionsHeader?: any;
  optionsData?: any;
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
  TableHeaderProps?: TableCellBaseProps;
  onChangeTable?: (nameFeature: string, value: string | number) => void;
}

export default function TableBase({
  header,
  isUsingSearch,
  tableHeaders,
  tableRows,
  children,
  rowId,
  rowClick,
  TableHeaderProps,
  onChangeTable,
}: TableBaseProps) {
  const clickedRow = rowClick
    ? rowClick
    : () => {
        return;
      };

  const handleChangeTable = (nameFeature: string, value: string | number) => {
    onChangeTable && onChangeTable(nameFeature, value);
  };
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <>{header ? header : null}</>
        {isUsingSearch && (
          <TextField
            placeholder="Search"
            size="small"
            onChange={(e) => handleChangeTable('search', e.target.value)}
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
                <TableCellBase
                  isHeader
                  TableCellProps={{ sx: { ...item.optionsHeader } }}
                  key={item.value}
                  {...TableHeaderProps}
                  sortable={item.sortable}
                  sortValue={item.sortValue ? item.sortValue : item.value}
                  handleSort={(sortBy, sortOrder) => handleChangeTable('sort', sortOrder ? `${sortBy}.${sortOrder}` : '')}
                >
                  {item.name}
                </TableCellBase>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {children ? (
              children
            ) : tableRows && tableRows.length ? (
              tableRows.map((row) => (
                <TableRowBase
                  key={rowId ? row[rowId] : row.id}
                  onClick={() => clickedRow(row.id)}
                  hover={Boolean(rowClick)}
                  sx={{ cursor: Boolean(rowClick) ? 'pointer' : 'default' }}
                >
                  {tableHeaders.map((item) => (
                    <TableCellBase TableCellProps={{ sx: { ...item.optionsData } }} key={item.value}>
                      {row[item.value]}
                    </TableCellBase>
                  ))}
                </TableRowBase>
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
