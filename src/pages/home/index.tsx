// React
import type { ReactElement } from 'react';

// Next
import dynamic from 'next/dynamic';

// Components
import { LayoutHome } from '@/common/layout';
import PageLoader from '@/common/base/PageLoader';

const HomePage = dynamic(() => import('@/features/home/views/HomePage'), { ssr: false, loading: () => <PageLoader /> });

const Home = () => <HomePage />;

Home.getLayout = (page: ReactElement) => {
  return <LayoutHome>{page}</LayoutHome>;
};

export const getStaticProps = () => {
  return {
    props: {
      title: 'Home',
    },
  };
};

export default Home;
