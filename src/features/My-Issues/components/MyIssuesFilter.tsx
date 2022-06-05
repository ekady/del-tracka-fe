// MUI Component
import { Autocomplete } from '@mui/material';

// Local Component
import { CustomInput } from '@/common/base';
import { FilterContainer, FilterListSelectContainer, FilterSelectContainer, FilterText } from '@/common/base/BaseFilter/styled';

import { AutocompleteOptions, FilterProps } from '@/types';

import STATUS, { StatusType } from '@/common/constants/status';
import LEVEL, { LevelType } from '@/common/constants/level';
import { memo } from 'react';

const listStatus: AutocompleteOptions[] = Object.keys(STATUS).map((status) => ({
  value: STATUS[status as StatusType].value,
  label: STATUS[status as StatusType].name,
}));
const listLevel: AutocompleteOptions[] = Object.keys(LEVEL).map((level) => ({
  value: LEVEL[level as LevelType].value,
  label: LEVEL[level as LevelType].name,
}));

const MyIssuesFilter = ({ onChange }: FilterProps) => {
  return (
    <FilterContainer>
      <FilterText>Filter</FilterText>
      <FilterListSelectContainer container columnSpacing={1}>
        <FilterSelectContainer item xs={12} md={4}>
          <Autocomplete
            id="tags-outlined"
            options={[]}
            onChange={(_, value) => onChange && onChange('projectName', value)}
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
        <FilterSelectContainer item xs={12} md={4}>
          <Autocomplete
            id="tags-outlined"
            options={listLevel}
            onChange={(_, value) => onChange && onChange('level', value)}
            renderInput={(params) => (
              <CustomInput fieldname="Level" TextFieldProps={{ ...params, size: 'small', placeholder: 'Level' }} />
            )}
          />
        </FilterSelectContainer>
        <FilterSelectContainer item xs={12} md={4}>
          <Autocomplete
            id="tags-outlined"
            options={listStatus}
            onChange={(_, value) => onChange && onChange('status', value)}
            renderInput={(params) => (
              <CustomInput fieldname="Status" TextFieldProps={{ ...params, size: 'small', placeholder: 'Status' }} />
            )}
          />
        </FilterSelectContainer>
      </FilterListSelectContainer>
    </FilterContainer>
  );
};

export default memo(MyIssuesFilter);
