'use client';

import { ElementType, useCallback } from 'react';

import { useSearchParams } from 'next/navigation';

import { Autocomplete, Box, InputLabel, TextFieldProps } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import CustomInput from '@/app/_common/base/CustomInput';
import { TextFieldStyled } from '@/app/_common/base/CustomInput/styled';
import { useTableChange } from '@/app/_common/hooks/useTableChange.hook';
import { IProjectWithPermissions } from '@/app/app/projects/_interfaces';

const initialDateValue = {
  startDate: dayjs().startOf('month').toISOString(),
  endDate: dayjs().endOf('month').toISOString(),
};

interface ILogActivityFilterProps {
  projects: IProjectWithPermissions[];
}

const LogActivityFilter = ({ projects }: ILogActivityFilterProps) => {
  const searchParams = useSearchParams();
  const { onFilterChange } = useTableChange();

  const convertSearchParamsToProjectList = useCallback(
    (key: string): IProjectWithPermissions | null => {
      return projects?.find((project) => project.shortId === searchParams.get(key)) ?? null;
    },
    [projects, searchParams],
  );

  return (
    <Box
      display="grid"
      gap={{ xs: 1, md: 4 }}
      alignItems="center"
      gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }}
    >
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
      <Box width="100%">
        <InputLabel>Start Date</InputLabel>
        <MobileDatePicker
          defaultValue={dayjs(initialDateValue.startDate)}
          format="YYYY-MM-DD"
          slotProps={{ textField: { size: 'small' } }}
          sx={{ width: '100%', marginBottom: 2 }}
          closeOnSelect
          maxDate={
            searchParams.get('endDate') ? dayjs(searchParams.get('endDate') as string) : dayjs(initialDateValue.endDate)
          }
          disabled={!searchParams.get('project')}
          onChange={(value) => onFilterChange('startDate', value?.toISOString() ?? '')}
          slots={{ textField: TextFieldStyled as ElementType<TextFieldProps> }}
        />
      </Box>
      <Box width="100%">
        <InputLabel>End Date</InputLabel>
        <MobileDatePicker
          defaultValue={dayjs(initialDateValue.endDate)}
          format="YYYY-MM-DD"
          slotProps={{ textField: { size: 'small' } }}
          sx={{ width: '100%', marginBottom: 2 }}
          closeOnSelect
          onChange={(value) => onFilterChange('endDate', value?.toISOString() ?? '')}
          disabled={!searchParams.get('project')}
          minDate={
            searchParams.get('startDate')
              ? dayjs(searchParams.get('startDate') as string)
              : dayjs(initialDateValue.startDate)
          }
          slots={{ textField: TextFieldStyled as ElementType<TextFieldProps> }}
        />
      </Box>
    </Box>
  );
};

export default LogActivityFilter;
