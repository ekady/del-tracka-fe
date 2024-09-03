'use client';

import { useCallback, useState } from 'react';

import Circle from '@mui/icons-material/Circle';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { toast } from 'react-toastify';

import { DialogActions } from '@/app/_common/base/BaseDialogAlert/styled';
import { TFunctionVoidWithParams } from '@/app/_common/types';
import { ISprintsResponse } from '@/app/app/projects/_interfaces';

export interface ITaskMoveSprintProps {
  // taskIds: string[];
  sprintList: ISprintsResponse[];
  sprintId: string;
  callback?: TFunctionVoidWithParams<'success' | 'error'>;
}

const TaskMoveSprint = ({ callback, sprintList, sprintId }: ITaskMoveSprintProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const toggleDialog = useCallback(() => setOpen(!open), [open]);

  const selectedSprint = useCallback(async () => {
    setLoading(true);
    try {
      toast.success('Task has been successfully move to the selected sprint');
      callback?.('success');
    } catch {
      callback?.('error');
    }
  }, [callback]) as TFunctionVoidWithParams<string>;
  return (
    <>
      <LoadingButton
        loading={loading}
        onClick={toggleDialog}
        color="primary"
        variant="outlined"
        sx={{ flexGrow: { xs: 1, md: 'initial' } }}
      >
        Move Task to Sprint
      </LoadingButton>
      <Dialog open={open} onClose={toggleDialog} PaperProps={{ sx: { borderRadius: 5, maxWidth: 300 } }}>
        <DialogTitle>Move Task to Sprint ...</DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: 2, minHeight: 100, maxHeight: 400, overflowY: 'auto', minWidth: 300 }}>
          <List>
            {sprintList.map((sprint) => (
              <ListItem key={sprint._id} disableGutters>
                <ListItemButton
                  onClick={() => selectedSprint('a')}
                  disabled={sprint.shortId === sprintId}
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
        </DialogContent>
        <DialogActions sx={{ mb: 1, px: 3 }}>
          <Button onClick={toggleDialog} variant="outlined" fullWidth disabled={loading}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskMoveSprint;
