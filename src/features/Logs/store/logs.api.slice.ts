import { apiSlice } from '@/common/store/api.slice';
import { IPaginationResponse } from '@/common/types';
import { ActivityType } from '../constants/activityType.constant';

export interface ILogsResponse {
  _id: string;
  createdAt: string;
  createdBy: { _id: string; firstName: string; lastName: string };
  project: { _id: string; name: string; description: string; shortId: string };
  stageBefore: { _id: string; name: string; description: string; shortId: string };
  stageAfter: { _id: string; name: string; description: string; shortId: string };
  taskAfter: { _id: string; title: string; feature: string; priority: string; status: string };
  taskBefore: { _id: string; title: string; feature: string; priority: string; status: string };
  type: ActivityType;
}

export const logsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLogActivities: builder.query<IPaginationResponse<ILogsResponse>, void>({
      query: () => {
        return { url: '/activities' };
      },
    }),
  }),
});

export const { useGetLogActivitiesQuery } = logsApiSlice;
export const { resetApiState } = logsApiSlice.util;
