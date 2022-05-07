import { ReactNode } from 'react';

import { FunctionVoid } from '@/common/types';

export interface TableActionProps {
  hideView?: boolean;
  handleView?: FunctionVoid;
  hideDelete?: boolean;
  handleDelete?: FunctionVoid;
  hideEdit?: boolean;
  handleEdit?: FunctionVoid;
  children?: ReactNode;
}
