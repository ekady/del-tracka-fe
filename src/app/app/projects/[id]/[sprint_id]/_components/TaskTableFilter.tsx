'use client';

import { useCallback } from 'react';

import { useSearchParams } from 'next/navigation';

import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';

import {
  FilterContainer,
  FilterListSelectContainer,
  FilterSelectContainer,
} from '@/app/_common/base/BaseFilter/styled';
import CustomInput from '@/app/_common/base/CustomInput';
import { levelList } from '@/app/_common/constants/level.constant';
import { statusList } from '@/app/_common/constants/status.constant';
import { useTableChange } from '@/app/_common/hooks/useTableChange.hook';
import { IAutocompleteOptions } from '@/app/_common/types';

const ProjectTaskFilter = () => {
  const { onFilterChange } = useTableChange();
  const searchParams = useSearchParams();

  const convertSearchParamsToLevelList = useCallback(
    (key: string): IAutocompleteOptions[] => {
      return (searchParams.get(key)?.split(',') ?? []).map(
        (value) => levelList.find((level) => level.value === value) ?? { label: '', value: '' },
      );
    },
    [searchParams],
  );

  const convertSearchParamsToStatusList = useCallback(
    (key: string): IAutocompleteOptions[] => {
      return (searchParams.get(key)?.split(',') ?? []).map(
        (value) => statusList.find((level) => level.value === value) ?? { label: '', value: '' },
      );
    },
    [searchParams],
  );

  return (
    <FilterContainer>
      <Typography sx={{ flexGrow: 1 }}>Filter</Typography>
      <FilterListSelectContainer container columnSpacing={1}>
        <FilterSelectContainer item xs={12} md={6}>
          <Autocomplete
            id="tags-outlined"
            multiple
            options={levelList}
            onChange={(_, value) => onFilterChange('priority', value?.map((val) => val.value)?.toString())}
            defaultValue={convertSearchParamsToLevelList('priority')}
            ChipProps={{ size: 'small' }}
            renderInput={(params) => (
              <CustomInput
                fieldname="Level"
                TextFieldProps={{
                  ...params,
                  size: 'small',
                  placeholder: 'Level',
                }}
              />
            )}
          />
        </FilterSelectContainer>
        <FilterSelectContainer item xs={12} md={6}>
          <Autocomplete
            id="tags-outlined"
            multiple
            options={statusList}
            onChange={(_, value) => onFilterChange('status', value?.map((val) => val.value)?.toString())}
            defaultValue={convertSearchParamsToStatusList('status')}
            ChipProps={{ size: 'small' }}
            renderInput={(params) => (
              <CustomInput
                fieldname="Status"
                TextFieldProps={{
                  ...params,
                  size: 'small',
                  placeholder: 'Status',
                }}
              />
            )}
          />
        </FilterSelectContainer>
      </FilterListSelectContainer>
    </FilterContainer>
  );
};

export default ProjectTaskFilter;
