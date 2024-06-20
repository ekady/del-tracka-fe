// MUI Components
import { InputLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

// Types
import TableCellLevel from '@/app/_common/base/TableCellLevel';
import TableCellStatus from '@/app/_common/base/TableCellStatus';
import { TLevelType } from '@/app/_common/constants/level.constant';
import { TStatusType } from '@/app/_common/constants/status.constant';
import { ITaskResponse } from '@/app/app/projects/_interfaces';

export interface ITaskDetailProps {
  task: ITaskResponse | null;
}

const TaskDetail = ({ task }: ITaskDetailProps) => {
  return (
    <>
      <Grid container columnSpacing={3} component="main">
        <Grid item xs={12} sx={{ marginBottom: 3 }}>
          <InputLabel>Main Problem</InputLabel>
          <Typography variant="subtitle1">{task?.title ?? '-'}</Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <InputLabel>Feature</InputLabel>
            <Typography variant="subtitle1">{task?.title ?? '-'}</Typography>
          </Box>
          <Box>
            <InputLabel>Reporter</InputLabel>
            <Typography variant="subtitle1">
              {task?.reporter ? `${task?.reporter?.firstName ?? ''} ${task?.reporter?.lastName ?? ''}` : '-'}
            </Typography>
          </Box>
          <Box>
            <InputLabel>Assignee</InputLabel>
            <Typography variant="subtitle1">
              {task?.assignee ? `${task?.assignee?.firstName ?? ''} ${task?.assignee?.lastName ?? ''}` : '-'}
            </Typography>
          </Box>
          <Grid container columnSpacing={3}>
            <Grid item xs={6}>
              <InputLabel>Priority</InputLabel>
              <TableCellLevel level={task?.priority as TLevelType} />
            </Grid>
            <Grid item xs={6}>
              <InputLabel>Status</InputLabel>
              <TableCellStatus status={task?.status as TStatusType} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <InputLabel>Due Date</InputLabel>
            <Typography variant="subtitle1">
              {task?.dueDate ? dayjs(task.dueDate).format('YYYY-MM-DD') : '-'}
            </Typography>
          </Box>
          <Box>
            <InputLabel>Detail</InputLabel>
            <Typography variant="subtitle1" sx={{ whiteSpace: 'break-spaces' }}>
              {task?.detail ?? '-'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TaskDetail;
