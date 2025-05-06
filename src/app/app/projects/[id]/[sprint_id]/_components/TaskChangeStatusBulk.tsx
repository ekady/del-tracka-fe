'use client';

import { useState, MouseEvent, memo, useCallback } from 'react';

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { LoadingButton } from '@mui/lab';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import ListSubheader from '@mui/material/ListSubheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { toast } from 'react-toastify';

import STATUS, { TStatusType } from '@/app/_common/constants/status.constant';
import { TFunctionVoidWithParams } from '@/app/_common/types';
import {
  actionTaskUpdateBulkStatus,
  revalidateTaskListTag,
} from '@/app/app/projects/[id]/[sprint_id]/_actions/task.action';
import { IProjectSprintTaskId } from '@/app/app/projects/[id]/[sprint_id]/_interfaces';

export interface ITaskChangeStatusBulkProps extends Omit<IProjectSprintTaskId, 'taskId'> {
  taskIds: string[];
  callback?: TFunctionVoidWithParams<'success' | 'error'>;
}

const list = Object.keys(STATUS).map((key) => ({
  name: STATUS[key as TStatusType].name,
  value: STATUS[key as TStatusType].value,
}));

const TaskChangeStatusBulk = ({ projectId, sprintId, taskIds, callback }: ITaskChangeStatusBulkProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loading, setLoading] = useState(false);

  const handleOpenClose = useCallback(
    (event?: MouseEvent<HTMLElement>): void => {
      if (event && !anchorEl) {
        setAnchorEl(event.currentTarget);
      } else setAnchorEl(null);
    },
    [anchorEl],
  );

  const handleChangeStatus = useCallback(
    async (status: string) => {
      setLoading(true);
      try {
        const responseState = await actionTaskUpdateBulkStatus({ projectId, sprintId }, { taskIds, status });

        if (responseState.isSuccess) {
          revalidateTaskListTag(projectId, sprintId);
          handleOpenClose();
          toast.success('Task status has been updated successfully');
          callback?.('success');
        }

        if (responseState.isError) {
          callback?.('error');
        }
      } finally {
        setLoading(false);
      }
    },
    [callback, handleOpenClose, projectId, sprintId, taskIds],
  ) as TFunctionVoidWithParams<string>;

  return (
    <>
      <LoadingButton
        aria-controls={anchorEl ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={handleOpenClose}
        color="primary"
        variant="outlined"
        sx={{ flexGrow: { xs: 1, md: 'initial' } }}
        loading={loading}
        endIcon={<KeyboardArrowDown />}
      >
        Change Status
      </LoadingButton>
      <Menu
        id="fade-menu"
        MenuListProps={{ 'aria-labelledby': 'fade-button' }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClick={handleOpenClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <ListSubheader component="div" sx={{ lineHeight: '30px' }}>
          Change to
        </ListSubheader>
        <Divider />
        {list.map((item) => (
          <MenuItem onClick={() => handleChangeStatus((item.value as string) ?? '')} key={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default memo(TaskChangeStatusBulk);
