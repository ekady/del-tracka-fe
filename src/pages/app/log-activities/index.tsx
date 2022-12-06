// React
import { ReactElement, useEffect } from 'react';

// MUI Component
import { Autocomplete, Box, Button } from '@mui/material';

// Components
import { LayoutDefault } from '@/common/layout';
import { Logs } from '@/features/logs/components';

import { useGetLogActivitiesQuery, resetApiState } from '@/features/logs/store/logs.api.slice';
import { useAppDispatch } from '@/common/store';
import { useTableChange } from '@/common/hooks/useTableChange';
import { CustomInput } from '@/common/base';

const LogsPage = () => {
  const dispatch = useAppDispatch();
  const { isLoading, isFetching, data } = useGetLogActivitiesQuery();

  const { onFilter, onLimitPage, onSearch, onSort, tableOption } = useTableChange();

  useEffect(() => {
    return () => {
      dispatch(resetApiState());
    };
  }, [dispatch]);

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
        <Box>
          <Autocomplete
            id="tags-outlined"
            options={[]}
            onChange={(_, value) => onFilter({ priority: value?.value || '' })}
            renderInput={(params) => (
              <CustomInput
                fieldname="Project"
                TextFieldProps={{ ...params, size: 'small', placeholder: 'Choose project' }}
              />
            )}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Button variant="contained" color="secondary">
            Export to Excel
          </Button>
          <Button
            variant="contained"
            sx={{ background: '#27A03B', color: '#fff', ml: { xs: 0, sm: 1 }, mt: { xs: 1, sm: 0 } }}
          >
            Export to PDF
          </Button>
        </Box>
      </Box>
      <Logs
        TableProps={{
          rows: data?.content ?? [],
          rowCount: data?.totalContent ?? 0,
          loading: isFetching || isLoading,
          onPageSizeChange: (limit) => onLimitPage('limit', limit),
          onPageChange: (page) => onLimitPage('page', page),
        }}
      />
    </>
  );
};

LogsPage.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default LogsPage;
