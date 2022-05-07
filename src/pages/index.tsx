// React
import type { ReactElement } from 'react';

// Components
import { LayoutHome } from '../common/layout';
import LandingUI from '../modules/Landing/ui/LandingUI';

const Home = () => {
  return <LandingUI />;
};

Home.getLayout = (page: ReactElement) => {
  return <LayoutHome>{page}</LayoutHome>;
};

export default Home;
