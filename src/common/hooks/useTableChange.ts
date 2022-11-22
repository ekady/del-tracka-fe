import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { GridSortModel } from '@mui/x-data-grid';
import debounce, { Cancelable } from '@mui/utils/debounce';

import { IPaginationParams } from '@/common/types';
import { table } from '../constants';

const initialState: IPaginationParams = {
  limit: table.initialLimit,
  page: table.initialPage,
};

export type TSearchDebounce = (event: ChangeEvent<HTMLInputElement>) => void;

export const useTableChange = () => {
  const [tableOption, setTableOption] = useState<IPaginationParams>(initialState);

  const onSearch: Cancelable & TSearchDebounce = debounce<TSearchDebounce>((event) => {
    const search = event?.target?.value ? { search: event?.target?.value } : { search: '' };
    setTableOption((prevTableOption) => ({ ...prevTableOption, ...search }));
  }, 300);

  const onSort = useCallback((model: GridSortModel) => {
    const sort = model.reduce(
      (_, sort) => {
        const sortOrder = sort.sort === 'asc' ? 1 : 0;
        return sort.field ? { sortBy: `${sort.field}-${sortOrder}` } : {};
      },
      { sortBy: '' } as { sortBy?: string | null },
    );
    setTableOption((prevTableOption) => ({ ...prevTableOption, ...sort }));
  }, []);

  const onFilter = useCallback((value?: Record<string, string | number | null>) => {
    setTableOption((prevTableOption) => ({ ...prevTableOption, ...value }));
  }, []);

  const onLimitPage = useCallback((type: 'limit' | 'page', number: number) => {
    setTableOption((prevTableOption) => ({ ...prevTableOption, [type]: number }));
  }, []);

  useEffect(() => {
    return () => {
      onSearch.clear();
    };
  }, [onSearch]);

  return { tableOption, onSearch, onSort, onFilter, onLimitPage };
};
