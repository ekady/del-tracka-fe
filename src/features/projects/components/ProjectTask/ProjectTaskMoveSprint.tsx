import { useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Circle from '@mui/icons-material/Circle';

import { toast } from 'react-toastify';

import { TFunctionVoidWithParams } from '@/common/types';
import useProjectId from '../../hooks/useProjectId';
import { DialogActions } from '@/common/base/BaseDialogAlert/styled';
import { useMoveSprintMutation } from '../../store/task.api.slice';
import { ButtonLoading } from '@/common/base';

export interface IProjectTaskMoveSprintProps {
  values: string[];
  callback?: TFunctionVoidWithParams<'success' | 'error'>;
}

const ProjectTaskMoveSprint = ({ values, callback }: IProjectTaskMoveSprintProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, isFetching, router } = useProjectId();
  const [moveSprint, { isLoading: isLoadingUpdate }] = useMoveSprintMutation();

  const toggleDialog = useCallback(() => setOpen(!open), [open]);

  const selectedSprint = useCallback(
    async (sprintId: string) => {
      try {
        const response = await moveSprint({
          ids: { idProject: router.query?.project_id as string, idSprint: router.query?.sprint_id as string },
          payload: { stageId: sprintId, taskIds: values },
        });
        if ('data' in response && response?.data?.data?.message === 'Success') {
          toast.success('Task has been successfully move to the selected sprint');
          callback?.('success');
        } else {
          callback?.('error');
        }
      } catch {
        callback?.('error');
      }
    },
    [callback, moveSprint, router.query?.project_id, router.query?.sprint_id, values],
  ) as TFunctionVoidWithParams<string>;
  return (
    <>
      <ButtonLoading
        loading={isLoadingUpdate}
        onClick={toggleDialog}
        color="primary"
        variant="outlined"
        sx={{ flexGrow: { xs: 1, md: 'initial' } }}
      >
        Move Task to Sprint
      </ButtonLoading>
      <Dialog open={open} onClose={toggleDialog} PaperProps={{ sx: { borderRadius: 5, maxWidth: 300 } }}>
        <DialogTitle>Move Task to Sprint ...</DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: 2, minHeight: 100, maxHeight: 400, overflowY: 'auto', minWidth: 300 }}>
          {isLoading || isFetching ? (
            <Box display="flex" alignItems="center" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <List>
              {data?.data.stages.map((sprint) => (
                <ListItem key={sprint._id} disableGutters>
                  <ListItemButton
                    onClick={() => selectedSprint(sprint.shortId)}
                    disabled={sprint.shortId === router.query?.sprint_id}
                    sx={{ px: 0 }}
                  >
                    <ListItemIcon>
                      <Circle fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={sprint.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions sx={{ mb: 1, px: 3 }}>
          <Button onClick={toggleDialog} variant="outlined" fullWidth disabled={isFetching || isLoading}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProjectTaskMoveSprint;
