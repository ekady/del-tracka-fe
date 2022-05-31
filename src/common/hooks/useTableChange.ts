import { useState } from 'react';
import { PaginationParams } from '@/types';
import { onFilterChange, onSearchChange, onSortChange } from '../helper/tableChange';

export const useTableChange = () => {
  const [tableOption, setTableOption] = useState<PaginationParams>({});
  let debounce: ReturnType<typeof setTimeout> | null = null;

  const onSearch = onSearchChange((search: PaginationParams) => {
    if (debounce) clearTimeout(debounce);
    debounce = setTimeout(() => {
      setTableOption((prevTableOption) => ({ ...prevTableOption, ...search }));
    }, 300);
  });

  const onSort = onSortChange((sort: PaginationParams) => {
    setTableOption((prevTableOption) => ({ ...prevTableOption, ...sort }));
  });

  const onFilter = onFilterChange((filter: PaginationParams) => {
    setTableOption((prevTableOption) => ({ ...prevTableOption, ...filter }));
  });

  return { tableOption, onSearch, onSort, onFilter };
};
