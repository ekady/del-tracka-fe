// React
import { ReactElement, useCallback, useEffect } from 'react';

// Next Auth
import { useSession } from 'next-auth/react';

// MUI Component
import { Autocomplete, Box, Button } from '@mui/material';

// Components
import { LayoutDefault } from '@/common/layout';
import { CustomInput } from '@/common/base';
import { Logs } from '@/features/logs/components';

// Hooks
import { useAppDispatch } from '@/common/store';
import { useTableChange } from '@/common/hooks/useTableChange';
import {
  invalidateTags,
  useGetProjectsQuery,
  useGetProjectActivitiesQuery,
} from '@/features/projects/store/project.api.slice';

// Helpers
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { forceFileDownload } from '@/common/helper/file';

const LogsPage = () => {
  const session = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(invalidateTags(['ProjectActivities', 'Projects']));
  }, [dispatch]);

  const { onFilter, onLimitPage, tableOption } = useTableChange();
  const { data: projectList } = useGetProjectsQuery();
  const { data, isLoading, isFetching } = useGetProjectActivitiesQuery(
    tableOption.projectId ? { id: tableOption.projectId as string, params: tableOption } : skipToken,
  );

  useEffect(() => {
    invalidateTags(['ProjectActivities']);
  }, [tableOption]);

  const handleGetFile = useCallback(
    async (type: 'pdf' | 'xlsx' = 'pdf') => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${tableOption.projectId}/activities/${type}`,
        { headers: { authorization: `Bearer ${session.data?.user.userToken.accessToken}` } },
      );
      const blob = await response.blob();
      if (blob) forceFileDownload(blob, { fileFormat: type, filename: 'Project Activities' });
    },
    [session.data?.user.userToken.accessToken, tableOption.projectId],
  );

  return (
    <>
      <Box
        sx={{
          mb: 5,
          justifyContent: 'space-between',
          alignItems: 'center',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box sx={{ width: '30%' }}>
          <Autocomplete
            id="tags-outlined"
            options={projectList?.data || []}
            disableClearable
            getOptionLabel={(val) => val.name}
            onChange={(_, value) => onFilter({ projectId: value?.shortId || '' })}
            renderInput={(params) => (
              <CustomInput
                fieldname="Project"
                TextFieldProps={{ ...params, size: 'small', placeholder: 'Choose project' }}
              />
            )}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleGetFile('xlsx')}
            disabled={!tableOption.projectId}
          >
            Export to Excel
          </Button>
          <Button
            variant="contained"
            sx={{ background: '#27A03B', color: '#fff', ml: { xs: 0, sm: 1 }, mt: { xs: 1, sm: 0 } }}
            disabled={!tableOption.projectId}
            onClick={() => handleGetFile('pdf')}
          >
            Export to PDF
          </Button>
        </Box>
      </Box>
      <Logs
        TableProps={{
          getRowId: (row) => row.createdAt,
          rows: data?.data.data ?? [],
          paginationMode: 'server',
          pagination: true,
          rowCount: data?.data.pagination.total || 0,
          loading: isLoading || isFetching,
          onPageSizeChange: (limit: number) => onLimitPage('limit', limit),
          onPageChange: (page: number) => onLimitPage('page', page + 1),
          hideFooterPagination: false,
        }}
      />
    </>
  );
};

LogsPage.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default LogsPage;
