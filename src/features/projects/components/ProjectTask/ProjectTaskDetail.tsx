// MUI Components
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// Date
import dayjs from 'dayjs';

// Local Components
import { BaseLabel, TableCellLevel, TableCellStatus } from '@/common/base';

// Types
import { IProjectSprintTaskDetail } from '@/features/projects/interfaces';
import { TLevelType } from '@/common/constants/level';
import { TStatusType } from '@/common/constants/status';

export interface IProjectTaskDetailProps {
  data?: IProjectSprintTaskDetail;
}

export default function ProjectTaskDetail({ data }: IProjectTaskDetailProps) {
  return (
    <>
      <Grid container columnSpacing={3} component="main">
        <Grid item xs={12} sx={{ marginBottom: 3 }}>
          <BaseLabel>Main Problem</BaseLabel>
          <Typography variant="subtitle1">{data?.title ?? '-'}</Typography>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <BaseLabel>Feature</BaseLabel>
            <Typography variant="subtitle1">{data?.title ?? '-'}</Typography>
          </Box>
          <Box>
            <BaseLabel>Reporter</BaseLabel>
            <Typography variant="subtitle1">
              {data?.reporter ? `${data?.reporter?.firstName ?? ''} ${data?.reporter?.lastName ?? ''}` : '-'}
            </Typography>
          </Box>
          <Box>
            <BaseLabel>Assignee</BaseLabel>
            <Typography variant="subtitle1">
              {data?.assignee ? `${data?.assignee?.firstName ?? ''} ${data?.assignee?.lastName ?? ''}` : '-'}
            </Typography>
          </Box>
          <Grid container columnSpacing={3}>
            <Grid item xs={6}>
              <BaseLabel>Priority</BaseLabel>
              <TableCellLevel level={data?.priority?.value as TLevelType} />
            </Grid>
            <Grid item xs={6}>
              <BaseLabel>Status</BaseLabel>
              <TableCellStatus status={data?.status as TStatusType} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box>
            <BaseLabel>Due Date</BaseLabel>
            <Typography variant="subtitle1">
              {data?.dueDate ? dayjs(data.dueDate).format('YYYY-MM-DD') : '-'}
            </Typography>
          </Box>
          <Box>
            <BaseLabel>Detail</BaseLabel>
            <Typography variant="subtitle1" sx={{ whiteSpace: 'break-spaces' }}>
              {data?.detail ?? '-'}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
