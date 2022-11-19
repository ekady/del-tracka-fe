import { RootState } from '@/common/store';
import { logsApiSlice, ILogsResponse } from './logs.api.slice';

export const selectLogsData = (state: RootState) =>
  logsApiSlice.endpoints.getLogActivities.select()(state).data?.content ?? ([] as ILogsResponse[]);
