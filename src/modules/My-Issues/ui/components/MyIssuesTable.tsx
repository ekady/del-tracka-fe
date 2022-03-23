// MUI Components
import { Chip } from '@mui/material';

// Local Component
import { TableAction, TableBase, TableNoData } from '@/common/components/base';
import { priority } from '@/common/constants';
import { StyledTableCell, StyledTableRow, TypeTableBaseHeaders } from '@/common/components/base/TableBase';

interface IDictionary {
  [index: string]: string;
}

function createData(
  id: string,
  mainProblem: string,
  projectName: string,
  dateUpdated: string,
  reporter: string,
  priority: string,
  status: string,
): IDictionary {
  return { id, mainProblem, projectName, dateUpdated, reporter, priority, status };
}

const rows = [
  createData('1', 'Frozen yoghurt', 'User', '2021-01-01', 'Reporter', 'HIGH', 'In Progress'),
  createData('2', 'Frozen yoghurt', 'User', '2021-01-01', 'Reporter', 'CRITICAL', 'In Progress'),
  createData('3', 'Frozen yoghurt', 'User', '2021-01-01', 'Reporter', 'LOW', 'In Progress'),
  createData('4', 'Frozen yoghurt', 'User', '2021-01-01', 'Reporter', 'NORMAL', 'In Progress'),
];

const tableHeaders: TypeTableBaseHeaders[] = [
  { name: 'Main Problem', value: 'mainProblem' },
  { name: 'Project Name', value: 'projectName' },
  { name: 'Date Updated', value: 'dateUpdated' },
  { name: 'Reporter', value: 'reporter' },
  { name: 'Priority', value: 'priority' },
  { name: 'Status', value: 'status' },
  { name: 'Action', value: 'action' },
];

export default function MyIssuesTable() {
  return (
    <TableBase isUsingSearch tableHeaders={tableHeaders}>
      {rows && rows.length ? (
        rows.map((row) => (
          <StyledTableRow key={row.id}>
            {tableHeaders.map((item) =>
              item.value === 'action' ? (
                <StyledTableCell key={item.value}>
                  <TableAction />
                </StyledTableCell>
              ) : item.value === 'priority' ? (
                <StyledTableCell key={item.value}>
                  <Chip
                    label={row[item.value]}
                    sx={{
                      background: priority[row[item.value]].color,
                      color: priority[row[item.value]].textColor,
                      border: '1px solid #ccc',
                      width: 100,
                      fontWeight: 'bold',
                    }}
                  />
                </StyledTableCell>
              ) : (
                <StyledTableCell key={item.value}>{row[item.value]}</StyledTableCell>
              ),
            )}
          </StyledTableRow>
        ))
      ) : (
        <TableNoData tableHeaders={tableHeaders} />
      )}
    </TableBase>
  );
}
