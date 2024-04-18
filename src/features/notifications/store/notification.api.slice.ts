import { apiSlice } from '@/common/store/api.slice';
import { IApiResponse, IPaginationParams, IPaginationResponse, IStatusMessageResponse } from '@/common/types';
import { INotificationResponse } from '../interfaces';

export const notificationTags: readonly string[] = ['AllNotifications', 'UnreadNotifications'];

export type TNotificationTags = (typeof notificationTags)[number];

export const notificationApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: notificationTags }).injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAllNotifications: builder.query<
      IApiResponse<IPaginationResponse<INotificationResponse>>,
      { params: IPaginationParams }
    >({
      query: ({ params }) => ({
        url: '/notification',
        params,
      }),
      providesTags: ['AllNotifications'],
    }),
    getAllUnreadNotification: builder.query<
      IApiResponse<IPaginationResponse<INotificationResponse>>,
      { params: IPaginationParams }
    >({
      query: ({ params }) => ({
        url: '/notification?readonly=true',
        params,
      }),
      providesTags: ['UnreadNotifications'],
    }),
    readNotification: builder.mutation<IApiResponse<IStatusMessageResponse>, { id: string }>({
      query: ({ id }) => ({
        url: `/notification/read/${id}`,
        method: 'put',
      }),
      invalidatesTags: ['AllNotifications', 'UnreadNotifications'],
    }),
    readAllNotifications: builder.mutation<IApiResponse<IStatusMessageResponse>, void>({
      query: () => ({
        url: '/notification/read',
        method: 'put',
      }),
      invalidatesTags: ['AllNotifications', 'UnreadNotifications'],
    }),
  }),
});

export const {
  useGetAllNotificationsQuery,
  useLazyGetAllNotificationsQuery,
  useGetAllUnreadNotificationQuery,
  useLazyGetAllUnreadNotificationQuery,
  useReadAllNotificationsMutation,
  useReadNotificationMutation,
} = notificationApiSlice;

export const { getAllNotifications, getAllUnreadNotification, readAllNotifications, readNotification } =
  notificationApiSlice.endpoints;

export const { invalidateTags: notificationInvalidateTags } = notificationApiSlice.util;
