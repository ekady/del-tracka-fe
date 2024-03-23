// React
import { ElementType, ReactElement, useCallback, useEffect, useState } from 'react';

// MUI Component
import Box from '@mui/material/Box';
import { TextFieldProps } from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { MobileDatePicker } from '@mui/x-date-pickers';

// Date
import dayjs from 'dayjs';

// Toast
import { toast } from 'react-toastify';

// Axios
import axios from 'axios';

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
import { TextFieldStyled } from '@/common/base/CustomInput/styled';

const initialDateValue = {
  startDate: dayjs().startOf('month').toISOString(),
  endDate: dayjs().endOf('month').toISOString(),
};

const LogsPage = () => {
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
        const response = await axios.post(
          `/api/project/${tableOption.projectId}/activity/${type}?${params.toString()}`,
          {},
          { responseType: 'blob' },
        );

        if (response.data) forceFileDownload(response.data, { fileFormat: type, filename: 'Project Activities' });
      } catch {
        toast.error('Something went wrong. Try again later');
      } finally {
        setLoadingDownload(false);
      }
    },
    [tableOption.endDate, tableOption.projectId, tableOption.startDate],
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
              maxDate={tableOption.endDate ? dayjs(tableOption.endDate as string) : dayjs(initialDateValue.endDate)}
              onChange={(value) => onFilter({ startDate: value?.toISOString() ?? '' })}
              slots={{ textField: TextFieldStyled as ElementType<TextFieldProps> }}
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
              minDate={
                tableOption.startDate ? dayjs(tableOption.startDate as string) : dayjs(initialDateValue.startDate)
              }
              onChange={(value) => onFilter({ endDate: value?.toISOString() ?? '' })}
              slots={{ textField: TextFieldStyled as ElementType<TextFieldProps> }}
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
