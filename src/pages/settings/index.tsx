// React
import { ReactElement } from 'react';

// Components
import { LayoutDefault } from '../../common/layout';
import ProfileUI, { ProfileData } from '../../features/Profile/ui/ProfileUI';

const Settings = () => {
  const submitHander = (v: ProfileData) => {
    console.log(v);
  };

  return <ProfileUI isFirstTime={false} submit={submitHander} isEditable={true} />;
};

Settings.getLayout = (page: ReactElement) => {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default Settings;
