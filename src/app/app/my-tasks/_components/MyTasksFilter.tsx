'use client';

import { memo, useCallback } from 'react';

// MUI Component
import { useSearchParams } from 'next/navigation';

import Autocomplete from '@mui/material/Autocomplete';

import {
  FilterContainer,
  FilterListSelectContainer,
  FilterSelectContainer,
  FilterText,
} from '@/app/_common/base/BaseFilter/styled';
import CustomInput from '@/app/_common/base/CustomInput';
import { levelList } from '@/app/_common/constants/level.constant';
import { statusList } from '@/app/_common/constants/status.constant';
import { useTableChange } from '@/app/_common/hooks/useTableChange.hook';
import { IAutocompleteOptions } from '@/app/_common/types';
import { IProjectWithPermissions } from '@/app/app/projects/_interfaces';

interface IMyTasksFilterProps {
  projects: IProjectWithPermissions[];
}

const MyTasksFilter = ({ projects }: IMyTasksFilterProps) => {
  const { onFilterChange } = useTableChange();
  const searchParams = useSearchParams();

  const convertSearchParamsToLevelList = useCallback(
    (key: string): IAutocompleteOptions[] => {
      const query = searchParams.get(key);
      if (!query) return [];

      return query
        .split(',')
        .map((value) => levelList.find((level) => level.value === value) as IAutocompleteOptions)
        .filter((value) => !!value);
    },
    [searchParams],
  );

  const convertSearchParamsToStatusList = useCallback(
    (key: string): IAutocompleteOptions[] => {
      const query = searchParams.get(key);
      if (!query) return [];

      return query
        .split(',')
        .map((value) => statusList.find((status) => status.value === value) as IAutocompleteOptions)
        .filter((value) => !!value);
    },
    [searchParams],
  );

  const convertSearchParamsToProjectList = useCallback(
    (key: string): IProjectWithPermissions | null => {
      return projects?.find((project) => project.shortId === searchParams.get(key)) ?? null;
    },
    [projects, searchParams],
  );

  return (
    <FilterContainer>
      <FilterText>Filter</FilterText>
      <FilterListSelectContainer container columnSpacing={1}>
        <FilterSelectContainer size={{ xs: 12, md: 4 }}>
          <Autocomplete
            id="tags-outlined"
            options={projects ?? []}
            getOptionLabel={(val) => val.name}
            onChange={(_, value) => onFilterChange('project', (value?.shortId as string) ?? '')}
            defaultValue={convertSearchParamsToProjectList('project')}
            size="small"
            renderInput={(params) => (
              <CustomInput
                fieldname="Project Name"
                TextFieldProps={{
                  ...params,
                  size: 'small',
                  placeholder: 'Project Name',
                }}
              />
            )}
          />
        </FilterSelectContainer>
        <FilterSelectContainer size={{ xs: 12, md: 4 }}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={levelList}
            onChange={(_, value) => onFilterChange('priority', (value.map((val) => val.value) ?? [])?.toString())}
            defaultValue={convertSearchParamsToLevelList('priority')}
            size="small"
            renderInput={(params) => (
              <CustomInput fieldname="Level" TextFieldProps={{ ...params, size: 'small', placeholder: 'Level' }} />
            )}
          />
        </FilterSelectContainer>
        <FilterSelectContainer size={{ xs: 12, md: 4 }}>
          <Autocomplete
            id="tags-outlined"
            multiple
            options={statusList}
            onChange={(_, value) => onFilterChange('status', (value.map((val) => val.value) ?? [])?.toString())}
            defaultValue={convertSearchParamsToStatusList('status')}
            size="small"
            renderInput={(params) => (
              <CustomInput fieldname="Status" TextFieldProps={{ ...params, size: 'small', placeholder: 'Status' }} />
            )}
          />
        </FilterSelectContainer>
      </FilterListSelectContainer>
    </FilterContainer>
  );
};

export default memo(MyTasksFilter);
