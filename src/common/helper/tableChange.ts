import { AutocompleteOptions, FunctionVoidWithParams, onChangeWithAdditionalParams, PaginationParams } from '@/types';
import { GridSortModel } from '@mui/x-data-grid';
import { ChangeEvent } from 'react';

export const onSortChange = (callback?: FunctionVoidWithParams<PaginationParams>) => (model: GridSortModel) => {
  const sort = model.reduce((_, sort) => ({ sort: `${sort.field}-${sort.sort}` }), { sort: '' });
  callback && callback(sort);
};

export const onSearchChange = (callback?: FunctionVoidWithParams<PaginationParams>) => (event: ChangeEvent<HTMLInputElement>) => {
  const search = { search: event?.target?.value ?? '' };
  callback && callback(search);
};

type FilterChange = (
  callback?: FunctionVoidWithParams<PaginationParams>,
) => onChangeWithAdditionalParams<string, AutocompleteOptions>;

export const onFilterChange: FilterChange = (callback) => (fieldname) => (_, value: AutocompleteOptions | null) => {
  if (fieldname) {
    const filter = { [fieldname]: value?.value ?? '' };
    callback && callback(filter);
  }
};
