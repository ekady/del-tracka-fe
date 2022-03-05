// React
import type { ReactElement } from 'react';

// Components
import { LayoutDefault } from '@/common/components/layout';
import MyIssuesUI from '@/modules/My-Issues/ui/MyIssuesUI';

const MyIssuesPage = () => {
  return <MyIssuesUI />;
};

MyIssuesPage.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default MyIssuesPage;
