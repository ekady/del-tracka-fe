// React
import { memo } from 'react';

// MUI Component
import { Autocomplete, Typography } from '@mui/material';

// Local Component
import { CustomInput } from '@/common/base';
import { FilterContainer, FilterListSelectContainer, FilterSelectContainer } from '@/common/base/BaseFilter/styled';

import { FunctionVoidWithParams } from '@/common/types';

import { levelList } from '@/common/constants/level';
import { statusList } from '@/common/constants/status';

export interface ProjectTaskFilterProps {
  onChange: FunctionVoidWithParams<Record<string, string | null>>;
}

const ProjectTaskFilter = ({ onChange }: ProjectTaskFilterProps) => {
  return (
    <FilterContainer>
      <Typography sx={{ flexGrow: 1 }}>Filter</Typography>
      <FilterListSelectContainer container columnSpacing={1}>
        <FilterSelectContainer item xs={12} md={6}>
          <Autocomplete
            id="tags-outlined"
            options={levelList}
            onChange={(_, value) => onChange?.({ priority: value?.value ?? '' })}
            renderInput={(params) => (
              <CustomInput fieldname="Level" TextFieldProps={{ ...params, size: 'small', placeholder: 'Level' }} />
            )}
          />
        </FilterSelectContainer>
        <FilterSelectContainer item xs={12} md={6}>
          <Autocomplete
            id="tags-outlined"
            options={statusList}
            onChange={(_, value) => onChange?.({ status: value?.value ?? '' })}
            renderInput={(params) => (
              <CustomInput fieldname="Status" TextFieldProps={{ ...params, size: 'small', placeholder: 'Status' }} />
            )}
          />
        </FilterSelectContainer>
      </FilterListSelectContainer>
    </FilterContainer>
  );
};

export default memo(ProjectTaskFilter);
