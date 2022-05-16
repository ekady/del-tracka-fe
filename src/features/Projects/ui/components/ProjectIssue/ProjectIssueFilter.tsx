// MUI Component
import { Autocomplete, Typography } from '@mui/material';

// Local Component
import { CustomInput } from '@/common/base';
import { FilterContainer, FilterListSelectContainer, FilterSelectContainer } from '@/common/base/BaseFilter/styled';

export default function ProjectIssueFilter() {
  return (
    <FilterContainer>
      <Typography sx={{ flexGrow: 1 }}>Filter</Typography>
      <FilterListSelectContainer container columnSpacing={1}>
        <FilterSelectContainer item xs={12} md={6}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={[]}
            renderInput={(params) => (
              <CustomInput fieldname="Level" TextFieldProps={{ ...params, size: 'small', placeholder: 'Level' }} />
            )}
          />
        </FilterSelectContainer>
        <FilterSelectContainer item xs={12} md={6}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={[]}
            renderInput={(params) => (
              <CustomInput fieldname="Status" TextFieldProps={{ ...params, size: 'small', placeholder: 'Status' }} />
            )}
          />
        </FilterSelectContainer>
      </FilterListSelectContainer>
    </FilterContainer>
  );
}
