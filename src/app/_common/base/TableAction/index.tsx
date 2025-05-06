'use client';

import { memo } from 'react';

import Link from 'next/link';

import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { IPropsChildren, TFunctionVoid } from '@/app/_common/types';

export interface ITableActionProps extends IPropsChildren {
  hideView?: boolean;
  toView?: string;
  handleView?: TFunctionVoid;
  hideDelete?: boolean;
  handleDelete?: TFunctionVoid;
  hideEdit?: boolean;
  toEdit?: string;
  handleEdit?: TFunctionVoid;
}

const TableAction = ({
  children,
  handleDelete,
  handleEdit,
  handleView,
  toView,
  toEdit,
  hideDelete,
  hideEdit,
  hideView,
}: ITableActionProps) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', height: '100%' }}>
      {!hideView && (
        <IconButton LinkComponent={Link} href={toView ?? ''} onClick={handleView} size="small">
          <Visibility />
        </IconButton>
      )}
      {!hideEdit && (
        <IconButton LinkComponent={Link} href={toEdit ?? ''} onClick={handleEdit} size="small">
          <Edit />
        </IconButton>
      )}
      {!hideDelete && (
        <IconButton onClick={handleDelete} size="small">
          <Delete />
        </IconButton>
      )}
      {children}
    </Box>
  );
};

export default memo(TableAction);
