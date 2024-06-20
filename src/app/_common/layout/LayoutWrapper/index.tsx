'use client';

import { useNotification } from '@/app/_common/hooks/useNotification';
import { IPropsChildren } from '@/app/_common/types';

const LayoutWrapper = ({ children }: IPropsChildren) => {
  useNotification();

  return <>{children}</>;
};

export default LayoutWrapper;
