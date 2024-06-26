// React
import { useCallback, useState } from 'react';

// MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// MUI Icons
import ContentCopy from '@mui/icons-material/ContentCopy';

// Redux
import { skipToken } from '@reduxjs/toolkit/dist/query';

// Local Components
import { ProjectTaskActivity, ProjectTaskComments, ProjectTaskForm } from '../components';
import { CarouselImages } from '@/common/base';

// Hooks
import { useGetTaskQuery } from '../store/task.api.slice';
import useProjectId from '../hooks/useProjectId';
import { useProjectBreadcrumb } from '../hooks/useProjectBreadcrumb';

import { IFileStream } from '@/common/types';

import { copyToClipboard } from '@/common/helper';

// Create : Only Form that contain upload image
// Edit: Form contain upload image, comments, logs

export interface IProjectCreateEditTaskPageProps {
  category: 'create' | 'edit';
}

const ProjectCreateEditTaskPage = ({ category }: IProjectCreateEditTaskPageProps) => {
  const isCreate = category === 'create';

  const {
    projectId,
    router: { query },
  } = useProjectId();
  const task = useGetTaskQuery(
    projectId && query.sprint_id && (query.task_id || isCreate)
      ? { ids: { idProject: projectId, idSprint: query.sprint_id as string, idTask: (query?.task_id as string) ?? '' } }
      : skipToken,
  );
  const [tab, setTab] = useState<string>('form');

  useProjectBreadcrumb({
    '[project_id]': task.data?.project?.name ?? '',
    '[sprint_id]': task.data?.stage?.name ?? task?.data?.name ?? '',
    '[task_id]': task.data?.title ?? '',
  });

  const setVariantButton = useCallback(
    (type: string) => {
      return tab === type ? 'contained' : 'outlined';
    },
    [tab],
  );

  const handleTabChange = useCallback(
    (type: string) => {
      if (tab === type) return;
      setTab(type);
    },
    [tab],
  );

  return (
    <>
      <Box display={isCreate ? 'none' : 'flex'} alignItems="center" justifyContent="center">
        <ButtonGroup disableElevation variant="outlined" aria-label="outlined primary button group">
          <Button variant={setVariantButton('form')} onClick={() => handleTabChange('form')}>
            Form
          </Button>
          {!isCreate && (
            <>
              <Button variant={setVariantButton('comments')} onClick={() => handleTabChange('comments')}>
                Comments
              </Button>
              <Button variant={setVariantButton('activities')} onClick={() => handleTabChange('activities')}>
                Activities
              </Button>
            </>
          )}
        </ButtonGroup>
      </Box>
      {isCreate && (
        <Box>
          <Typography variant="h6" component="h2">
            New Tasks
          </Typography>
        </Box>
      )}

      <Box height={40} />

      {!isCreate && (
        <Box marginBottom={3}>
          <Typography fontWeight="bold">Task Id</Typography>
          <Box display="flex" alignItems="center" justifyContent="flex-start" gap={4}>
            <Typography>#{task?.data?.shortId ?? '-'}</Typography>
            <IconButton
              id="demo-positioned-button"
              aria-haspopup="true"
              onClick={() => copyToClipboard(`#${task?.data?.shortId ?? ''}`)}
            >
              <ContentCopy />
            </IconButton>
          </Box>
        </Box>
      )}

      {tab === 'form' && <ProjectTaskForm data={task.data} />}
      {tab === 'comments' && <ProjectTaskComments />}
      {tab === 'activities' && <ProjectTaskActivity />}
      {tab === 'media' && (
        <Box position="relative" bgcolor="white">
          {!task?.data?.images?.length && (
            <Typography textAlign="center" py={4} color="black">
              No Images
            </Typography>
          )}
          <CarouselImages
            images={
              (task.data?.images?.filter((img) => 'completedPath' in img && img.completedPath) as IFileStream[]) ?? []
            }
          />
        </Box>
      )}

      <Box height={100} />
    </>
  );
};

export default ProjectCreateEditTaskPage;
