import { apiSlice } from '@/common/store/api.slice';

export const fileSteamApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getFile: builder.query<string, string>({
      queryFn: async (path, _api, _extraOptions, baseQuery) => {
        const result = await baseQuery({
          url: `/file-stream?key=${path}`,
          responseHandler: (response) => response.blob(),
        });
        return { data: URL.createObjectURL(result.data as Blob) };
      },
    }),
  }),
});

export const { useGetFileQuery, useLazyGetFileQuery } = fileSteamApiSlice;
export const { getFile } = fileSteamApiSlice.endpoints;
export const { resetApiState: fileStreamResetApiState } = fileSteamApiSlice.util;
