import { GridColDef } from '@mui/x-data-grid';

import { DataTable } from '@/common/base';
import { TableAndSearchProps } from '@/types';

export type LogsProps = TableAndSearchProps & {
  notFullInfo?: boolean;
  isUsingDate?: boolean;
  isUsingProjectName?: boolean;
  isUsingCardNumber?: boolean;
  isUsingFeature?: boolean;
};

const date: GridColDef = { headerName: 'Date', field: 'date', width: 100, sortable: false };
const projectName: GridColDef = { headerName: 'Project Name', field: 'projectName', width: 200, sortable: false };
const cardNumber: GridColDef = { headerName: 'Card Number', field: 'cardNumber', width: 150, sortable: false };
const feature: GridColDef = { headerName: 'Feature', field: 'feature', width: 200, sortable: false };
const activity: GridColDef = { headerName: 'Activity', field: 'activity', width: 200, sortable: false };

const LogsUI = ({ notFullInfo, isUsingProjectName, isUsingDate, isUsingCardNumber, isUsingFeature, TableProps }: LogsProps) => {
  const tableHeaders: GridColDef[] = [activity];
  if (notFullInfo) {
    if (isUsingFeature) tableHeaders.unshift(feature);
    if (isUsingCardNumber) tableHeaders.unshift(cardNumber);
    if (isUsingProjectName) tableHeaders.unshift(projectName);
    if (isUsingDate) tableHeaders.unshift(date);
  } else tableHeaders.unshift(...[date, projectName, cardNumber, feature]);
  return <DataTable rows={[]} columns={tableHeaders} {...TableProps} />;
};

export default LogsUI;
