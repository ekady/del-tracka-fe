import { apiSlice } from '@/common/store/api.slice';
import { IPaginationParams, IPaginationResponse } from '@/common/types';
import { ActivityType } from '../constants/activityType.constant';

export interface ILogsResponse {
  _id: string;
  createdAt: string;
  createdBy: { _id: string; firstName: string; lastName: string };
  project: { _id: string; name: string; description: string; shortId: string };
  stageBefore: { _id: string; name: string; description: string; shortId: string };
  stageAfter: { _id: string; name: string; description: string; shortId: string };
  type: ActivityType;
}

export const logsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLogActivities: builder.query<IPaginationResponse<ILogsResponse>, IPaginationParams>({
      query: (arg) => {
        return { url: '/activities', params: arg };
      },
    }),
  }),
});

export const { useGetLogActivitiesQuery } = logsApiSlice;
export const { resetApiState } = logsApiSlice.util;
