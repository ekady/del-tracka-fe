import { useAppDispatch } from '@/common/store';
import { setCustomBreadcrumb } from '@/common/store/general.slice';
import { useEffect } from 'react';

export const useProjectBreadcrumb = (value: {
  '[project_id]': string;
  '[sprint_id]'?: string;
  '[task_id]'?: string;
}): void => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setCustomBreadcrumb(value));
  }, [dispatch, value]);
};
