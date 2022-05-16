// MUI Component
import { Autocomplete } from '@mui/material';

// Local Component
import { CustomInput } from '@/common/base';
import { FilterContainer, FilterListSelectContainer, FilterSelectContainer, FilterText } from '@/common/base/BaseFilter/styled';

const MyIssuesFilter = () => {
  return (
    <FilterContainer>
      <FilterText>Filter</FilterText>
      <FilterListSelectContainer container columnSpacing={1}>
        <FilterSelectContainer item xs={12} md={4}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={[]}
            renderInput={(params) => (
              <CustomInput fieldname="Project Name" TextFieldProps={{ ...params, size: 'small', placeholder: 'Project Name' }} />
            )}
          />
        </FilterSelectContainer>
        <FilterSelectContainer item xs={12} md={4}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={[]}
            renderInput={(params) => (
              <CustomInput fieldname="Level" TextFieldProps={{ ...params, size: 'small', placeholder: 'Level' }} />
            )}
          />
        </FilterSelectContainer>
        <FilterSelectContainer item xs={12} md={4}>
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
};

export default MyIssuesFilter;
