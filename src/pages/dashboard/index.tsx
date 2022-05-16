// React
import type { ReactElement } from 'react';

// Components
import { LayoutDefault } from '@/common/layout';
import DashboardUI from '@/features/Dashboard/ui/DashboardUI';

const DashboardPage = () => {
  return <DashboardUI />;
};

DashboardPage.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default DashboardPage;
