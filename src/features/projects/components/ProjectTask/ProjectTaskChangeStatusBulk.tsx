// React
import { useState, MouseEvent, memo, useCallback } from 'react';

// Next
import { useRouter } from 'next/router';

// MUI Components
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import ListSubheader from '@mui/material/ListSubheader';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

import { toast } from 'react-toastify';

import { TFunctionVoidWithParams } from '@/common/types';
import STATUS, { TStatusType } from '@/common/constants/status';
import { useUpdateStatusTaskBulkMutation } from '../../store/task.api.slice';
import { ButtonLoading } from '@/common/base';

export interface IProjectTaskChangeStatusBulkProps {
  values: string[];
  callback?: TFunctionVoidWithParams<'success' | 'error'>;
}

const list = Object.keys(STATUS).map((key) => ({
  name: STATUS[key as TStatusType].name,
  value: STATUS[key as TStatusType].value,
}));

const ProjectTaskChangeStatusBulk = ({ values, callback }: IProjectTaskChangeStatusBulkProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { query } = useRouter();
  const [updateStatus, { isLoading }] = useUpdateStatusTaskBulkMutation();

  const handleOpenClose = useCallback(
    (event?: MouseEvent<HTMLElement>): void => {
      if (event && !anchorEl) {
        setAnchorEl(event.currentTarget);
      } else setAnchorEl(null);
    },
    [anchorEl],
  );

  const handleClick = useCallback(
    async (status: string) => {
      try {
        const response = await updateStatus({
          ids: { idProject: query.project_id as string, idSprint: query.sprint_id as string },
          payload: { status, taskIds: values },
        });

        if ('data' in response && response?.data?.data?.message === 'Success') {
          handleOpenClose();
          toast.success('Task status has been updated successfully');
          callback?.('success');
        } else {
          callback?.('error');
        }
      } catch {
        callback?.('error');
      }
    },
    [callback, handleOpenClose, query.project_id, query.sprint_id, updateStatus, values],
  ) as TFunctionVoidWithParams<string>;

  return (
    <>
      <ButtonLoading
        aria-controls={anchorEl ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={handleOpenClose}
        color="primary"
        variant="outlined"
        sx={{ flexGrow: { xs: 1, md: 'initial' } }}
        loading={isLoading}
        endIcon={<KeyboardArrowDown />}
      >
        Change Status
      </ButtonLoading>
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
          <MenuItem onClick={() => handleClick((item.value as string) ?? '')} key={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default memo(ProjectTaskChangeStatusBulk);
