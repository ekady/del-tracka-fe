// MUI Component
import { Autocomplete } from '@mui/material';

// Local Component
import { CustomInput } from '@/common/base';
import {
  FilterContainer,
  FilterListSelectContainer,
  FilterSelectContainer,
  FilterText,
} from '@/common/base/BaseFilter/styled';

import { IFilterProps } from '@/common/types';

import { statusList } from '@/common/constants/status';
import { levelList } from '@/common/constants/level';
import { memo } from 'react';

const MyTasksFilter = ({ onChange }: IFilterProps) => {
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
            options={levelList}
            onChange={(_, value) => onChange && onChange('level', value)}
            renderInput={(params) => (
              <CustomInput fieldname="Level" TextFieldProps={{ ...params, size: 'small', placeholder: 'Level' }} />
            )}
          />
        </FilterSelectContainer>
        <FilterSelectContainer item xs={12} md={4}>
          <Autocomplete
            id="tags-outlined"
            options={statusList}
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

export default memo(MyTasksFilter);
