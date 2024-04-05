// Redux
import { skipToken } from '@reduxjs/toolkit/dist/query';

// MUI
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Components
import { ProjectTaskFilter, ProjectTaskTable } from '@/features/projects/components';

import { useRouter } from 'next/router';
import { useGetSprintQuery } from '@/features/projects/store/sprint.api.slice';
import { useTableChange } from '@/common/hooks/useTableChange';
import { useGetTasksQuery } from '@/features/projects/store/task.api.slice';
import { useProjectBreadcrumb } from '@/features/projects/hooks/useProjectBreadcrumb';

import { ITaskResponse } from '@/features/projects/interfaces';

const ProjectSprintPage = () => {
  const router = useRouter();
  const idProject = router.query?.project_id as string;
  const idSprint = router.query?.sprint_id as string;

  const { onFilter, onLimitPage, onSearch, onSort, tableOption } = useTableChange({ sortBy: 'updatedAt|-1' });
  const { data: sprintInfo, isFetching: isSprintInfoFetching } = useGetSprintQuery(
    idProject && idSprint ? { idProject, idSprint } : skipToken,
  );
  const { data: issuesData, isFetching: isTasksFetching } = useGetTasksQuery({
    ids: { idProject, idSprint },
    params: tableOption,
  });

  useProjectBreadcrumb({
    '[project_id]': sprintInfo?.data.project?.name ?? '',
    '[sprint_id]': sprintInfo?.data.name ?? '',
  });

  return (
    <>
      <Box>
        <Typography variant="h6" gutterBottom>
          {isSprintInfoFetching ? '-' : sprintInfo?.data.name}
        </Typography>
        <Typography>{isSprintInfoFetching ? `Sprint ${sprintInfo?.data.name}` : '-'}</Typography>
      </Box>
      <Box height={25} />
      <Box>
        <ProjectTaskFilter onChange={onFilter} />
        <Box sx={{ height: 40 }} />
        <ProjectTaskTable
          disabledBulkMoveSprint
          SearchProps={{ onChange: onSearch }}
          TableProps={{
            getRowId: (row: ITaskResponse) => row._id,
            rows: issuesData?.data.data ?? [],
            paginationMode: 'server',
            rowCount: issuesData?.data.pagination.total ?? 0,
            loading: isTasksFetching,
            onSortModelChange: onSort,
            onPaginationModelChange: (model) => {
              onLimitPage('limit', model.pageSize);
              onLimitPage('page', model.page + 1);
            },
            paginationModel: {
              page: (issuesData?.data.pagination.page ?? 1) - 1,
              pageSize: issuesData?.data.pagination.limit ?? 10,
            },
          }}
        />
      </Box>
    </>
  );
};

export default ProjectSprintPage;
