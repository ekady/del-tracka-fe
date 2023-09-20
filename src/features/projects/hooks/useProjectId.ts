import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/dist/query';

import { useAppDispatch } from '@/common/store';
import { invalidateTags, useGetProjectQuery } from '../store/project.api.slice';

const useProjectId = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(invalidateTags(['Project']));
  }, [dispatch]);

  const router = useRouter();
  const projectId = router.query.project_id as string;
  const query = useGetProjectQuery(projectId ?? skipToken);

  return { router, projectId, ...query };
};

export default useProjectId;
