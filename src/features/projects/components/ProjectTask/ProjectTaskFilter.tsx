// React
import { memo } from 'react';

// MUI Component
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';

// Local Component
import { CustomInput } from '@/common/base';
import { FilterContainer, FilterListSelectContainer, FilterSelectContainer } from '@/common/base/BaseFilter/styled';

import { TFunctionVoidWithParams } from '@/common/types';

import { levelList } from '@/common/constants/level';
import { statusList } from '@/common/constants/status';

export interface IProjectTaskFilterProps {
  onChange: TFunctionVoidWithParams<Record<string, string | string[] | null>>;
}

const ProjectTaskFilter = ({ onChange }: IProjectTaskFilterProps) => {
  return (
    <FilterContainer>
      <Typography sx={{ flexGrow: 1 }}>Filter</Typography>
      <FilterListSelectContainer container columnSpacing={1}>
        <FilterSelectContainer item xs={12} md={6}>
          <Autocomplete
            id="tags-outlined"
            multiple
            options={levelList}
            onChange={(_, value) => onChange?.({ priority: value?.map((val) => val.value) ?? [] })}
            renderInput={(params) => (
              <CustomInput fieldname="Level" TextFieldProps={{ ...params, size: 'small', placeholder: 'Level' }} />
            )}
          />
        </FilterSelectContainer>
        <FilterSelectContainer item xs={12} md={6}>
          <Autocomplete
            id="tags-outlined"
            multiple
            options={statusList}
            onChange={(_, value) => onChange?.({ status: value?.map((val) => val.value) ?? [] })}
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
