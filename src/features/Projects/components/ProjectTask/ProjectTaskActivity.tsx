import { useEffect } from 'react';

import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import { MobileDatePicker } from '@mui/x-date-pickers';

import dayjs from 'dayjs';

import { useAppDispatch } from '@/common/store';
import { Logs } from '@/features/logs/components';
import { useLazyGetTaskActivitiesQuery } from '@/features/projects/store/task.api.slice';
import { useTableChange } from '@/common/hooks/useTableChange';
import { BaseLabel } from '@/common/base';

const initialDateValue = {
  startDate: dayjs().startOf('month').toISOString(),
  endDate: dayjs().endOf('month').toISOString(),
};

const ProjectTaskActivity = () => {
  const { query } = useRouter();
  const idProject = query.project_id as string;
  const idSprint = query.sprint_id as string;
  const idTask = query.task_id as string;

  const dispatch = useAppDispatch();
  const { onLimitPage, onFilter, tableOption } = useTableChange(initialDateValue);
  const [fetchData, { data, isLoading, isFetching }] = useLazyGetTaskActivitiesQuery();

  useEffect(() => {
    if (idProject && idSprint && idTask) fetchData({ ids: { idProject, idSprint, idTask }, params: tableOption });
  }, [dispatch, fetchData, idProject, idSprint, idTask, tableOption]);

  return (
    <>
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3} mb={4}>
        <Box width="100%">
          <BaseLabel>Start Date</BaseLabel>
          <MobileDatePicker
            defaultValue={dayjs(initialDateValue.startDate)}
            format="YYYY-MM-DD"
            slotProps={{ textField: { size: 'small' } }}
            sx={{ width: '100%', marginBottom: 2 }}
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
            closeOnSelect
            onChange={(value) => onFilter({ endDate: value?.toISOString() ?? '' })}
          />
        </Box>
      </Box>
      <Logs
        TableProps={{
          rows: data?.data?.data ?? [],
          rowCount: data?.data?.pagination.total ?? 0,
          loading: isLoading || isFetching,
          getRowId: (row) => row.createdAt,
          paginationMode: 'server',
          pagination: true,
          onPaginationModelChange: (model) => {
            onLimitPage('limit', model.pageSize);
            onLimitPage('page', model.page + 1);
          },
          hideFooterPagination: false,
          paginationModel: {
            page: (data?.data.pagination.page ?? 1) - 1,
            pageSize: data?.data.pagination.limit ?? 10,
          },
        }}
      />
    </>
  );
};

export default ProjectTaskActivity;
