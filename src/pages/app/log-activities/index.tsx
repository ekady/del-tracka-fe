// React
import { ReactElement, useCallback, useEffect, useState } from 'react';

// Next Auth
import { useSession } from 'next-auth/react';

// MUI Component
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import { MobileDatePicker } from '@mui/x-date-pickers';

// Date
import dayjs from 'dayjs';

// Toast
import { toast } from 'react-toastify';

// Components
import { LayoutDefault } from '@/common/layout';
import { BaseLabel, ButtonLoading, CustomInput } from '@/common/base';
import { Logs } from '@/features/logs/components';

// Hooks
import { useTableChange } from '@/common/hooks/useTableChange';
import { useGetProjectsQuery, useLazyGetProjectActivitiesQuery } from '@/features/projects/store/project.api.slice';

// Helpers
import { forceFileDownload } from '@/common/helper/file';

import { FunctionVoid } from '@/common/types';

const initialDateValue = {
  startDate: dayjs().startOf('month').toISOString(),
  endDate: dayjs().endOf('month').toISOString(),
};

const LogsPage = () => {
  const session = useSession();
  const [loadingDownload, setLoadingDownload] = useState(false);

  const { onFilter, onLimitPage, tableOption } = useTableChange(initialDateValue);
  const { data: projectList } = useGetProjectsQuery();
  const [fetchActivities, { data, isLoading, isFetching }] = useLazyGetProjectActivitiesQuery();

  useEffect(() => {
    if (tableOption.projectId) {
      fetchActivities({ id: tableOption.projectId as string, params: tableOption });
    }
  }, [tableOption, fetchActivities]);

  const handleGetFile = useCallback(
    async (type: 'pdf' | 'xlsx' = 'pdf') => {
      try {
        setLoadingDownload(true);
        const params = new URLSearchParams({
          startDate: tableOption.startDate as string,
          endDate: tableOption.endDate as string,
        });
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/${
            tableOption.projectId
          }/activities/${type}?${params.toString()}`,
          { headers: { authorization: `Bearer ${session.data?.user.userToken.accessToken}` }, method: 'POST' },
        );
        if (!response.ok) {
          toast.error('Something went wrong. Try again later');
          return;
        }
        const blob = await response.blob();
        if (blob) forceFileDownload(blob, { fileFormat: type, filename: 'Project Activities' });
      } catch {
        //
      } finally {
        setLoadingDownload(false);
      }
    },
    [session.data?.user.userToken.accessToken, tableOption.endDate, tableOption.projectId, tableOption.startDate],
  );

  return (
    <>
      <Box sx={{ mb: 5, display: 'flex', flexDirection: 'column' }}>
        <Box
          display="grid"
          gap={{ xs: 1, md: 4 }}
          alignItems="center"
          gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }}
        >
          <Autocomplete
            id="tags-outlined"
            options={projectList?.data ?? []}
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
          <Box width="100%">
            <BaseLabel>Start Date</BaseLabel>
            <MobileDatePicker
              defaultValue={dayjs(initialDateValue.startDate)}
              format="YYYY-MM-DD"
              slotProps={{ textField: { size: 'small' } }}
              sx={{ width: '100%', marginBottom: 2 }}
              disabled={!tableOption.projectId}
              closeOnSelect
              onChange={(value) => onFilter({ startDate: value?.toISOString() ?? '' })}
            />
          </Box>
          <Box width="100%">
            <BaseLabel>End Date</BaseLabel>
            <MobileDatePicker
              defaultValue={dayjs(initialDateValue.endDate)}
              format="YYYY-MM-DD"
              slotProps={{ textField: { size: 'small' } }}
              sx={{ width: '100%', marginBottom: 2 }}
              disabled={!tableOption.projectId}
              closeOnSelect
              onChange={(value) => onFilter({ endDate: value?.toISOString() ?? '' })}
            />
          </Box>
        </Box>
        <Box marginTop={3} sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
          <ButtonLoading
            variant="contained"
            color="secondary"
            onClick={(() => handleGetFile('xlsx')) as FunctionVoid}
            disabled={!tableOption.projectId}
            loading={loadingDownload}
          >
            Export to Excel
          </ButtonLoading>
          <ButtonLoading
            variant="contained"
            sx={{ background: '#27A03B', color: '#fff', ml: { xs: 0, sm: 1 }, mt: { xs: 1, sm: 0 } }}
            disabled={!tableOption.projectId}
            loading={loadingDownload}
            onClick={(() => handleGetFile('pdf')) as FunctionVoid}
          >
            Export to PDF
          </ButtonLoading>
        </Box>
      </Box>
      <Logs
        TableProps={{
          getRowId: (row) => row.createdAt,
          rows: data?.data.data ?? [],
          paginationMode: 'server',
          pagination: true,
          rowCount: data?.data.pagination.total ?? 0,
          paginationModel: {
            page: (data?.data.pagination.page ?? 1) - 1,
            pageSize: data?.data.pagination.limit ?? 10,
          },
          loading: isLoading || isFetching,
          onPaginationModelChange: (model) => {
            onLimitPage('limit', model.pageSize);
            onLimitPage('page', model.page + 1);
          },
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
