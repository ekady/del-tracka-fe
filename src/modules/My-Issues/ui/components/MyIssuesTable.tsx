// MUI Utils
import { styled } from '@mui/material/styles';

// MUI Components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { Chip, TextField, InputAdornment } from '@mui/material';

// MUI Icons
import { SearchRounded } from '@mui/icons-material/';

// Local Component
import { TableAction } from '@/common/components/base';
import { priority } from '@/common/constants';

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
}));

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

const tableHeaders = [
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
    <TableContainer component={Box}>
      <Box sx={{ textAlign: 'right', my: 4 }}>
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
      </Box>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {tableHeaders.map((item) => (
              <StyledTableCell key={item.value}>{item.name}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
