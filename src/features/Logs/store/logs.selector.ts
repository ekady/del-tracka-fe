import { RootState } from '@/common/store/store';
import { logsApiSlice, LogsResponse } from './logs.api.slice';

export const selectLogsData = (state: RootState) =>
  logsApiSlice.endpoints.getLogActivities.select()(state).data ?? ([] as LogsResponse[]);
