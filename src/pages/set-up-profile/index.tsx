// React
import { ReactElement } from 'react';

// Components
import { LayoutPlain } from '../../common/layout';
import ProfileUI, { ProfileData } from '../../modules/Profile/ui/ProfileUI';

const SetUpProfile = () => {
  const submitHander = (v: ProfileData) => {
    console.log(v);
  };

  return <ProfileUI isFirstTime={true} submit={submitHander} isEditable={true} />;
};

SetUpProfile.getLayout = (page: ReactElement) => {
  return <LayoutPlain>{page}</LayoutPlain>;
};

export default SetUpProfile;
