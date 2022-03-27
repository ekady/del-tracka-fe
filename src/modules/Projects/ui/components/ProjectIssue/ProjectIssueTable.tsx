// MUI Components
import { Chip } from '@mui/material';

// Local Component
import { TableAction, TableBase, TableNoData } from '@/common/components/base';
import { level } from '@/common/constants';
import { TypeTableBaseHeaders } from '@/common/components/base/table/TableBase';
import { TableCellBase, TableRowBase } from '@/common/components/base/table';

interface Indexable {
  [index: string]: string | number;
}

export type ProjectIssueType = {
  id: string;
  level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'NORMAL' | 'LOW';
  status: 'open' | 'in progress' | 'review' | 'hold' | 'closed';
  bugNumber: number | string;
  mainProblem: string;
  feature: string;
  dateUpdated: string;
  reporter: string;
  assigneeAvatar: string;
};

function createData(
  id: string,
  level: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'NORMAL' | 'LOW',
  status: 'open' | 'in progress' | 'review' | 'hold' | 'closed',
  bugNumber: number | string,
  mainProblem: string,
  feature: string,
  dateUpdated: string,
  reporter: string,
  assigneeAvatar: string,
): Indexable {
  return { id, level, status, bugNumber, mainProblem, feature, dateUpdated, reporter, assigneeAvatar };
}

const rows = [
  createData('1', 'CRITICAL', 'open', '01', 'Cannot be saved', 'Profile', '2021-01-01', 'Reporter', 'Chixi'),
  createData('2', 'HIGH', 'in progress', '05', 'Cannot be edited', 'Profile', '2021-01-01', 'Reporter', 'Diyos'),
  createData('3', 'LOW', 'open', '01', 'Cannot be saved', 'Profile', '2021-01-01', 'Reporter', 'Chixi'),
  createData('4', 'NORMAL', 'in progress', '05', 'Cannot be edited', 'Profile', '2021-01-01', 'Reporter', 'Diyos'),
  createData('5', 'MEDIUM', 'open', '01', 'Cannot be saved', 'Profile', '2021-01-01', 'Reporter', 'Chixi'),
  createData('6', 'HIGH', 'in progress', '05', 'Cannot be edited', 'Profile', '2021-01-01', 'Reporter', 'Diyos'),
];

const tableHeaders: TypeTableBaseHeaders[] = [
  { name: 'Bug Number', value: 'bugNumber', sortable: true, optionsData: { textAlign: 'center' } },
  { name: 'Main Problem', value: 'mainProblem', sortable: true },
  { name: 'Feature', value: 'feature', sortable: true, optionsData: { textTransform: 'capitalize' } },
  { name: 'Level', value: 'level', sortable: true },
  { name: 'Status', value: 'status', sortable: true, optionsData: { textTransform: 'capitalize' } },
  { name: 'Date Updated', value: 'dateUpdated', sortable: true },
  { name: 'Reporter', value: 'reporter', sortable: true, optionsData: { textTransform: 'capitalize' } },
  { name: 'Assignee', value: 'assigneeAvatar', sortable: true },
  { name: 'Action', value: 'action' },
];

export default function ProjectIssueTable() {
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
                <TableCellBase TableCellProps={{ sx: { ...item.optionsData } }} key={item.value}>
                  {row[item.value]}
                </TableCellBase>
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
