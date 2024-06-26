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
import { ProjectTaskActivity, ProjectTaskComments, ProjectTaskDetail } from '../components';
import { CarouselImages } from '@/common/base';

// Hooks
import { useGetTaskQuery } from '../store/task.api.slice';
import useProjectId from '../hooks/useProjectId';
import { useProjectBreadcrumb } from '../hooks/useProjectBreadcrumb';

import { TFunctionVoid, IFileStream } from '@/common/types';

import { copyToClipboard } from '@/common/helper';

const ProjectDetailTaskPage = () => {
  const {
    projectId,
    data: projectData,
    router: { query, push },
  } = useProjectId();
  const task = useGetTaskQuery(
    projectId && query.sprint_id && query.task_id
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

  const handleBackToTaskList = useCallback(async () => {
    await push(`/app/projects/${projectId}/${query.sprint_id as string}`);
  }, [projectId, push, query.sprint_id]);

  const handleToEdit = useCallback(async () => {
    await push(`/app/projects/${projectId}/${query.sprint_id as string}/${query.task_id as string}/edit`);
  }, [projectId, push, query.sprint_id, query.task_id]);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <ButtonGroup disableElevation variant="outlined" aria-label="outlined primary button group">
          <Button variant={setVariantButton('form')} onClick={() => handleTabChange('form')}>
            Detail
          </Button>
          <Button variant={setVariantButton('media')} onClick={() => handleTabChange('media')}>
            Media
          </Button>
          <Button variant={setVariantButton('comments')} onClick={() => handleTabChange('comments')}>
            Comments
          </Button>
          <Button variant={setVariantButton('activities')} onClick={() => handleTabChange('activities')}>
            Activities
          </Button>
        </ButtonGroup>
      </Box>

      <Box height={40} />

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

      {tab === 'form' && <ProjectTaskDetail data={task.data} />}
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
      <Box sx={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          className="text-right"
          variant="outlined"
          color="primary"
          onClick={handleBackToTaskList as TFunctionVoid}
        >
          Back
        </Button>

        {projectData?.data.rolePermissions.TASK.update && (
          <Button className="text-right" variant="contained" color="primary" onClick={handleToEdit as TFunctionVoid}>
            Edit
          </Button>
        )}
      </Box>
    </>
  );
};

export default ProjectDetailTaskPage;
