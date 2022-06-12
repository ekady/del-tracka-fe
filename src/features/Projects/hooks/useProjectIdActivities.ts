import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useRouter } from 'next/router';
import { useGetProjectActivitiesQuery } from '../store/project.api.slice';

const useProjectIdActivities = () => {
  const router = useRouter();
  const projectId = router.query.project_id as string;
  const query = useGetProjectActivitiesQuery(projectId ?? skipToken);

  return { router, projectId, ...query };
};

export default useProjectIdActivities;
