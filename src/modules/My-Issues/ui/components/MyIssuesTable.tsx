// MUI Components
import { Chip } from '@mui/material';

// Local Component
import { TableAction, TableBase, TableNoData } from '@/common/components/base';
import { level } from '@/common/constants';
import { TypeTableBaseHeaders } from '@/common/components/base/table/TableBase';
import { TableCellBase, TableRowBase } from '@/common/components/base/table';

interface IDictionary {
  [index: string]: string;
}

function createData(
  id: string,
  mainProblem: string,
  projectName: string,
  dateUpdated: string,
  reporter: string,
  level: string,
  status: string,
): IDictionary {
  return { id, mainProblem, projectName, dateUpdated, reporter, level, status };
}

const rows = [
  createData('1', 'Frozen yoghurt', 'User', '2021-01-01', 'Reporter', 'HIGH', 'In Progress'),
  createData('2', 'Frozen yoghurt', 'User', '2021-01-01', 'Reporter', 'CRITICAL', 'In Progress'),
  createData('3', 'Frozen yoghurt', 'User', '2021-01-01', 'Reporter', 'LOW', 'In Progress'),
  createData('4', 'Frozen yoghurt', 'User', '2021-01-01', 'Reporter', 'NORMAL', 'In Progress'),
];

const tableHeaders: TypeTableBaseHeaders[] = [
  { name: 'Main Problem', value: 'mainProblem', sortable: true },
  { name: 'Project Name', value: 'projectName', sortable: true },
  { name: 'Date Updated', value: 'dateUpdated', sortable: true },
  { name: 'Reporter', value: 'reporter', sortable: true },
  { name: 'Level', value: 'level', sortable: true },
  { name: 'Status', value: 'status', sortable: true },
  { name: 'Action', value: 'action' },
];

export default function MyIssuesTable() {
  const handleChangeTable = (nameFeature: string, value: string | number) => {
    console.log(nameFeature, value);
  };

  return (
    <TableBase isUsingSearch tableHeaders={tableHeaders} onChangeTable={handleChangeTable}>
      {rows && rows.length ? (
        rows.map((row) => (
          <TableRowBase key={row.id} hover>
            {tableHeaders.map((item) =>
              item.value === 'action' ? (
                <TableCellBase key={item.value}>
                  <TableAction />
                </TableCellBase>
              ) : item.value === 'level' ? (
                <TableCellBase key={item.value}>
                  <Chip
                    label={row[item.value]}
                    sx={{
                      background: level[row[item.value]].color,
                      color: level[row[item.value]].textColor,
                      border: '1px solid #ccc',
                      width: 100,
                      fontWeight: 'bold',
                    }}
                  />
                </TableCellBase>
              ) : (
                <TableCellBase key={item.value}>{row[item.value]}</TableCellBase>
              ),
            )}
          </TableRowBase>
        ))
      ) : (
        <TableNoData tableHeaders={tableHeaders} />
      )}
    </TableBase>
  );
}
