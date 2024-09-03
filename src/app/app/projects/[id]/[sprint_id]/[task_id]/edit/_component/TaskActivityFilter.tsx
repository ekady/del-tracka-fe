'use client';

import { ElementType } from 'react';

import { useSearchParams } from 'next/navigation';

import { Box, InputLabel, TextFieldProps } from '@mui/material';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { TextFieldStyled } from '@/app/_common/base/CustomInput/styled';
import { useTableChange } from '@/app/_common/hooks/useTableChange.hook';

const initialDateValue = {
  startDate: dayjs().startOf('month').toISOString(),
  endDate: dayjs().endOf('month').toISOString(),
};

const TaskActivityFilter = () => {
  const searchParams = useSearchParams();
  const { onFilterChange } = useTableChange();

  return (
    <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3} mb={4}>
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

export default TaskActivityFilter;
