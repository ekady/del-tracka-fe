// React
import { useState } from 'react';

// MUI Components
import { Box, Button, ButtonGroup, Typography } from '@mui/material';

// Redux
import { skipToken } from '@reduxjs/toolkit/dist/query';

// Local Components
import { ProjectTaskActivity, ProjectTaskComments, ProjectTaskForm } from '.';
import { CarouselImages } from '@/common/base';

// Hooks
import { useGetTaskQuery } from '../store/task.api.slice';
import useProjectId from '../hooks/useProjectId';

import { Thumbnail } from '@/common/base/FileUploader/interfaces';

// Create : Only Form that contain upload image
// View: Disabled form, contain form without upload image, media, comments, logs
// Edit: Form contain upload image, comments, logs

export type ProjectTaskDetailProps = {
  category: 'create' | 'edit' | 'detail';
};

const ProjectTaskDetail = ({ category }: ProjectTaskDetailProps) => {
  const isDetail = category === 'detail';
  const isCreate = category === 'create';

  const {
    projectId,
    router: { query },
  } = useProjectId();
  const { data } = useGetTaskQuery(
    projectId && query.sprint_id && query.task_id
      ? { ids: { idProject: projectId, idSprint: query.sprint_id as string, idTask: query.task_id as string } }
      : skipToken,
  );
  const [tab, setTab] = useState<string>('form');

  const setVariantButton = (type: string) => {
    return tab === type ? 'contained' : 'outlined';
  };

  const onClickButton = (type: string) => {
    if (tab === type) return;
    setTab(type);
  };
  return (
    <>
      <Box display={isCreate ? 'none' : 'flex'} alignItems="center" justifyContent="center">
        <ButtonGroup disableElevation variant="outlined" aria-label="outlined primary button group">
          <Button variant={setVariantButton('form')} onClick={() => onClickButton('form')}>
            Form
          </Button>
          {!isCreate && (
            <>
              {isDetail && (
                <Button variant={setVariantButton('media')} onClick={() => onClickButton('media')}>
                  Media
                </Button>
              )}
              <Button variant={setVariantButton('comments')} onClick={() => onClickButton('comments')}>
                Comments
              </Button>
              <Button variant={setVariantButton('activities')} onClick={() => onClickButton('activities')}>
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

      {tab === 'form' && <ProjectTaskForm hideUploadFile={isDetail} disabled={isDetail} data={data} />}
      {tab === 'comments' && <ProjectTaskComments />}
      {tab === 'activities' && <ProjectTaskActivity />}
      {tab === 'media' && (
        <Box position="relative" bgcolor="white">
          <CarouselImages images={(data?.images?.filter((img) => 'src' in img && img.src) as Thumbnail[]) || []} />
        </Box>
      )}
    </>
  );
};

export default ProjectTaskDetail;
