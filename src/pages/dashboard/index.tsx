// React
import type { ReactElement } from 'react';

// Components
import { LayoutDefault } from '@/common/components/layout';
import DashboardUI from '@/modules/Dashboard/ui/DashboardUI';

const DashboardPage = () => {
  return <DashboardUI />;
};

DashboardPage.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default DashboardPage;
