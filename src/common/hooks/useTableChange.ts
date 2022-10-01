import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { GridSortModel } from '@mui/x-data-grid';
import { debounce } from '@mui/material';

import { PaginationParams } from '@/common/types';
import { table } from '../constants';

const initialState: PaginationParams = {
  limit: table.initialLimit,
  page: table.initialPage,
  search: '',
  sort: '',
};

export const useTableChange = () => {
  const [tableOption, setTableOption] = useState<PaginationParams>(initialState);

  const onSearch = debounce((event: ChangeEvent<HTMLInputElement>) => {
    const search = { search: event?.target?.value ?? '' };
    setTableOption((prevTableOption) => ({ ...prevTableOption, ...search }));
  }, 300);

  const onSort = useCallback((model: GridSortModel) => {
    const sort = model.reduce((_, sort) => ({ sort: `${sort.field}-${sort.sort}` }), { sort: '' });
    setTableOption((prevTableOption) => ({ ...prevTableOption, ...sort }));
  }, []);

  const onFilter = useCallback((fieldname: string, value: Record<string, string | number>) => {
    setTableOption((prevTableOption) => ({ ...prevTableOption, [fieldname]: value?.value ?? '' }));
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
