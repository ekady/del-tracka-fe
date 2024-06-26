// React
import { useCallback, useEffect, useState } from 'react';

// MUI Components
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// MUI Icons
import AddCircleOutlined from '@mui/icons-material/AddCircleOutlined';
import Sync from '@mui/icons-material/Sync';

// Local Components
import { ProjectDialogNew, ProjectList } from '.';
import { BaseDialogAlert } from '@/common/base';

import { IProjectRequest } from '../interfaces';
import { useAppDispatch } from '@/common/store';
import useDialogAlert from '@/common/base/BaseDialogAlert/useDialogAlert';
import {
  invalidateTags,
  resetApiState,
  useCreateProjectMutation,
  useGetProjectsQuery,
} from '../store/project.api.slice';
import { useGetProfileQuery } from '@/common/store/api.slice';

const messageSuccess = 'Project created successfully';

const ProjectSide = () => {
  const dispatch = useAppDispatch();
  const [createProject, { isLoading }] = useCreateProjectMutation();
  const { data, isFetching, isLoading: isLoadingData } = useGetProjectsQuery();
  const { dialogAlertOpt, openDialogSuccess, closeDialogAlert } = useDialogAlert();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { data: profileData } = useGetProfileQuery();

  useEffect(() => {
    return () => {
      resetApiState();
    };
  }, []);

  const toggleDialog = useCallback(() => {
    setOpenDialog(!openDialog);
  }, [openDialog]);

  const validateTags = useCallback(() => {
    dispatch(invalidateTags(['Projects', 'ProjectActivities', 'Sprints']));
  }, [dispatch]);

  const successDialog = useCallback(
    async (data: IProjectRequest) => {
      const response = await createProject(data);
      if ('data' in response && response.data.data) {
        openDialogSuccess('Success', messageSuccess);
        toggleDialog();
      }
    },
    [createProject, openDialogSuccess, toggleDialog],
  );

  if (!data?.data.length) {
    return (
      <Box sx={{ textAlign: 'center', px: 2 }}>
        <Typography>No Project</Typography>
        <Box sx={{ height: 25 }} />
        <Grid container columns={1} spacing={1} alignItems="center">
          {!profileData?.data?.isDemo && (
            <Grid item xs={1}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                startIcon={<AddCircleOutlined />}
                onClick={toggleDialog}
              >
                Add New Project
              </Button>
            </Grid>
          )}
          <Grid item xs={1}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              onClick={validateTags}
              disabled={isLoadingData || isFetching}
            >
              <Sync />
            </Button>
          </Grid>
        </Grid>
        <ProjectDialogNew isOpen={openDialog} handleCancel={toggleDialog} handleOk={successDialog} />
      </Box>
    );
  }
  return (
    <Box sx={{ px: 2 }}>
      <Box sx={{ mb: 2, textAlign: 'center' }}>
        <Grid container columns={1} spacing={2} alignItems="center">
          {!profileData?.data?.isDemo && (
            <Grid item xs={1}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                startIcon={<AddCircleOutlined />}
                onClick={toggleDialog}
              >
                Add New Project
              </Button>
            </Grid>
          )}
          <Grid item xs={1}>
            <Button
              fullWidth
              color="primary"
              variant="outlined"
              onClick={validateTags}
              disabled={isLoadingData || isFetching}
            >
              <Sync />
            </Button>
          </Grid>
        </Grid>
        <ProjectDialogNew
          isOpen={openDialog}
          handleCancel={toggleDialog}
          handleOk={successDialog}
          loading={isLoading}
        />
      </Box>
      <ProjectList projectList={data?.data ?? []} />
      <BaseDialogAlert handleCancel={closeDialogAlert} handleOk={closeDialogAlert} {...dialogAlertOpt} />
    </Box>
  );
};

export default ProjectSide;
