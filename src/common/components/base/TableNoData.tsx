import { StyledTableCell, StyledTableRow, TypeTableBaseHeaders } from './TableBase';

export interface TableNoDataProps {
  tableHeaders: TypeTableBaseHeaders[];
}

const TableNoData = ({ tableHeaders }: TableNoDataProps) => (
  <StyledTableRow>
    <StyledTableCell colSpan={tableHeaders.length} align="center">
      No Data Available
    </StyledTableCell>
  </StyledTableRow>
);

export default TableNoData;
