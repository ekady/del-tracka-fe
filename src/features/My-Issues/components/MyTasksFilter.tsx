import { memo } from 'react';

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

import { statusList } from '@/common/constants/status';
import { levelList } from '@/common/constants/level';

import { ProjectTaskFilterProps } from '@/features/projects/components/ProjectTask/ProjectTaskFilter';
import { useGetProjectsQuery } from '@/features/projects/store/project.api.slice';

const MyTasksFilter = ({ onChange }: ProjectTaskFilterProps) => {
  const { data: projectList, isFetching, isLoading } = useGetProjectsQuery();

  return (
    <FilterContainer>
      <FilterText>Filter</FilterText>
      <FilterListSelectContainer container columnSpacing={1}>
        <FilterSelectContainer item xs={12} md={4}>
          <Autocomplete
            id="tags-outlined"
            options={projectList?.data || []}
            getOptionLabel={(val) => val.name}
            onChange={(_, value) => onChange && onChange({ project: value?.shortId || '' })}
            loading={isLoading || isFetching}
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
            onChange={(_, value) => onChange && onChange({ priority: value?.value || '' })}
            renderInput={(params) => (
              <CustomInput fieldname="Level" TextFieldProps={{ ...params, size: 'small', placeholder: 'Level' }} />
            )}
          />
        </FilterSelectContainer>
        <FilterSelectContainer item xs={12} md={4}>
          <Autocomplete
            id="tags-outlined"
            options={statusList}
            onChange={(_, value) => onChange && onChange({ status: value?.value || '' })}
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
