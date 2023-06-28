import { IPropsChildren } from '@/common/types';
import { useNotification } from '@/features/notifications/hooks/useNotification';

const LayoutWrapper = ({ children }: IPropsChildren) => {
  useNotification();

  return <>{children}</>;
};

export default LayoutWrapper;
