import { IPaginationParams } from '@/app/_common/types';

export const convertParamsToSearchQuery = (params: IPaginationParams = {}): string => {
  const modifiedParams = Object.keys(params).reduce(
    (acc, curr) => {
      acc[curr] = params[curr]?.toString() ?? '';
      return acc;
    },
    {} as Record<string, string>,
  );

  return new URLSearchParams(modifiedParams).toString();
};
