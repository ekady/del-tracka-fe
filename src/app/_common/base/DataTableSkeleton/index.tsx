import { Skeleton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

import { DataTableRowHeaderSkeleton, DataTableSkeletonContainer } from '@/app/_common/base/DataTableSkeleton/styled';

export interface IDataTableSkeletonProps {
  headers: { title: string; field: string; width?: number }[];
}

const DataTableSkeleton = ({ headers }: IDataTableSkeletonProps) => {
  return (
    <DataTableSkeletonContainer>
      <Table>
        <TableHead>
          <DataTableRowHeaderSkeleton>
            {headers.map((header) => (
              <TableCell key={header.field} align="left" sx={{ fontWeight: 'bold', minWidth: header.width || 'auto' }}>
                {header.title}
              </TableCell>
            ))}
          </DataTableRowHeaderSkeleton>
        </TableHead>
        <TableBody>
          {[...Array(5)].map((_row, index) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <TableCell key={header.field} component="th" scope="row" sx={{ minHeight: '60px' }}>
                  <Skeleton animation="wave" variant="text" height={30} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DataTableSkeletonContainer>
  );
};

export default DataTableSkeleton;
