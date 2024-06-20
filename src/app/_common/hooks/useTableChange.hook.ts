import { ChangeEvent, useCallback, useRef } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import debounce, { Cancelable } from '@mui/utils/debounce';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';

export type TSearchDebounce = (event: ChangeEvent<HTMLInputElement>) => void;

export const useTableChange = () => {
  const paths = useRef<Record<string, string>>({});
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleRouteChange = useCallback(() => {
    const currentSearchParams: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      currentSearchParams[key] = value;
    });
    const query = new URLSearchParams({ ...currentSearchParams, ...paths.current }).toString();
    router.push(`${pathname}?${query}`);
  }, [pathname, router, searchParams]);

  const onSearchChange: Cancelable & TSearchDebounce = debounce<TSearchDebounce>((event) => {
    const search = event?.target?.value ?? '';
    const oldSearch = paths.current.search ?? searchParams.get('search');
    paths.current.search = search;
    if (search !== oldSearch) {
      paths.current.page = '1';
      handleRouteChange();
    }
  }, 500);

  const onSortChange = useCallback(
    (model: GridSortModel) => {
      const sort = model.reduce(
        (_, sort) => {
          const sortOrder = sort.sort === 'asc' ? 1 : -1;
          return sort.field ? { sortBy: `${sort.field}|${sortOrder}` } : {};
        },
        { sortBy: '' } as { sortBy?: string | null },
      );
      const oldSort = paths.current.sortBy ?? searchParams.get('sortBy');
      paths.current.sortBy = sort.sortBy?.toString() ?? '';
      if (sort !== oldSort) handleRouteChange();
    },
    [handleRouteChange, searchParams],
  );

  const onFilterChange = useCallback(
    (key: string, value: string) => {
      const oldValue = paths.current[key] ?? searchParams.get(key);
      paths.current[key] = value ?? '';

      if (oldValue !== value) {
        paths.current.page = '1';
        handleRouteChange();
      }
    },
    [handleRouteChange, searchParams],
  );

  const onPaginationChange = useCallback(
    ({ page, pageSize }: Partial<GridPaginationModel>) => {
      const oldPage = paths.current.page || searchParams.get('page') || 1;
      const currentPage = ((page || 0) + 1)?.toString();
      paths.current.page = currentPage;

      const oldLimit = paths.current.limit || searchParams.get('limit') || '10';
      paths.current.limit = pageSize?.toString() || '10';

      if (pageSize?.toString() !== oldLimit) {
        paths.current.page = '1';
      }

      if (currentPage !== oldPage || pageSize?.toString() !== oldLimit) {
        handleRouteChange();
      }
    },
    [handleRouteChange, searchParams],
  );

  return { onSearchChange, onSortChange, onFilterChange, onPaginationChange };
};
