// React
import { useCallback, useEffect, useState } from 'react';

// MUI Components
import { Box, Button, ButtonGroup, IconButton, Typography } from '@mui/material';
import { ContentCopy } from '@mui/icons-material';

// Redux
import { skipToken } from '@reduxjs/toolkit/dist/query';

// Local Components
import { ProjectTaskActivity, ProjectTaskComments, ProjectTaskForm } from '.';
import { CarouselImages } from '@/common/base';

// Hooks
import { useGetTaskQuery } from '../store/task.api.slice';
import useProjectId from '../hooks/useProjectId';
import { useAppDispatch } from '@/common/store';
import { useProjectBreadcrumb } from '../hooks/useProjectBreadcrumb';

import { invalidateTags } from '../store/project.api.slice';

import { FunctionVoid, IFileStream } from '@/common/types';

import { copyToClipboard } from '@/common/helper';

// Create : Only Form that contain upload image
// View: Disabled form, contain form without upload image, media, comments, logs
// Edit: Form contain upload image, comments, logs

export type ProjectTaskDetailProps = {
  category: 'create' | 'edit' | 'detail';
};

const ProjectTaskDetail = ({ category }: ProjectTaskDetailProps) => {
  const isDetail = category === 'detail';
  const isCreate = category === 'create';

  const dispatch = useAppDispatch();
  const {
    projectId,
    router: { query, push },
  } = useProjectId();
  const task = useGetTaskQuery(
    projectId && query.sprint_id && query.task_id
      ? { ids: { idProject: projectId, idSprint: query.sprint_id as string, idTask: query.task_id as string } }
      : skipToken,
  );
  const [tab, setTab] = useState<string>('form');

  useProjectBreadcrumb({
    '[project_id]': task.data?.project?.name ?? '',
    '[sprint_id]': task.data?.stage?.name ?? task?.data?.name ?? '',
    '[task_id]': task.data?.title ?? '',
  });

  useEffect(() => {
    dispatch(invalidateTags(['Task']));
  }, [dispatch]);

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

  return (
    <>
      <Box display={isCreate ? 'none' : 'flex'} alignItems="center" justifyContent="center">
        <ButtonGroup disableElevation variant="outlined" aria-label="outlined primary button group">
          <Button variant={setVariantButton('form')} onClick={() => handleTabChange('form')}>
            Form
          </Button>
          {!isCreate && (
            <>
              {isDetail && (
                <Button variant={setVariantButton('media')} onClick={() => handleTabChange('media')}>
                  Media
                </Button>
              )}
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

      {tab === 'form' && (
        <ProjectTaskForm hideUploadFile={isDetail} disabled={isDetail} data={task.data} hideActions={isDetail} />
      )}
      {tab === 'comments' && <ProjectTaskComments />}
      {tab === 'activities' && <ProjectTaskActivity />}
      {tab === 'media' && (
        <Box position="relative" bgcolor="white">
          {!task?.data?.images?.length && (
            <Typography textAlign="center" py={4}>
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
      {isDetail && (
        <Box sx={{ textAlign: 'right' }}>
          <Button
            className="text-right"
            variant="contained"
            color="primary"
            onClick={handleBackToTaskList as FunctionVoid}
          >
            Back
          </Button>
        </Box>
      )}
    </>
  );
};

export default ProjectTaskDetail;
