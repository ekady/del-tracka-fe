'use client';

import Box from '@mui/material/Box';
import TablePagination from '@mui/material/TablePagination';
import dayjs from 'dayjs';

import { table } from '@/app/_common/constants';
import { useTableChange } from '@/app/_common/hooks/useTableChange.hook';
import { IPaginationResponse } from '@/app/_common/types';
import TaskCommentItem from '@/app/app/projects/[id]/[sprint_id]/[task_id]/edit/_component/TaskCommentItem';
import { ITaskComment } from '@/app/app/projects/_interfaces';

interface ITaskCommentList {
  commentPagination: IPaginationResponse<ITaskComment>;
}

const TaskCommentList = ({ commentPagination }: ITaskCommentList) => {
  const { onPaginationChange } = useTableChange();

  return (
    <>
      {commentPagination?.data.map((comment) => (
        <Box key={comment._id}>
          <TaskCommentItem
            comment={comment.comment}
            name={`${comment.user.firstName} ${comment.user.lastName}`}
            image={comment.user.picture ?? null}
            date={dayjs(comment.createdAt).format('MM/DD/YYYY, HH:mm:ss')}
          />
          <Box height={35} />
        </Box>
      ))}
      {!!commentPagination?.data?.length && (
        <TablePagination
          rowsPerPageOptions={table.limitOptions}
          component="div"
          labelRowsPerPage=""
          count={commentPagination?.pagination.total}
          page={commentPagination?.pagination.page > 0 ? commentPagination?.pagination.page - 1 : 0}
          rowsPerPage={commentPagination?.pagination.limit}
          onPageChange={(_, page) => onPaginationChange({ page, pageSize: commentPagination?.pagination.limit })}
          onRowsPerPageChange={(e) =>
            onPaginationChange({ page: commentPagination.pagination.page, pageSize: Number(e.target.value) })
          }
        />
      )}
    </>
  );
};

export default TaskCommentList;
