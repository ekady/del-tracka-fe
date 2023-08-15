// React
import { memo, ReactElement } from 'react';

// MUI
import Chip, { ChipProps } from '@mui/material/Chip';

import STATUS, { StatusType } from '@/common/constants/status';
import { FunctionVoidWithParams } from '@/common/types';

export interface TableCellStatusProps {
  status?: StatusType;
  SelectOption?: ReactElement;
  ChipProps?: ChipProps;
  onClickSelectOption?: FunctionVoidWithParams<string>;
}

const TableCellStatus = ({ status, SelectOption, ChipProps }: TableCellStatusProps) => {
  const chipProps = ChipProps ?? {};
  const chipSelectOption: ChipProps = SelectOption
    ? {
        onDelete: () => {
          //
        },
        deleteIcon: SelectOption,
        ...chipProps,
      }
    : chipProps;
  return (
    <Chip
      label={status ? STATUS[status].name : ''}
      sx={{
        background: status ? STATUS[status].color : 'white',
        color: status ? STATUS[status].textColor : 'black',
        border: '1px solid #ccc',
        width: 130,
        fontWeight: 'bold',
        justifyContent: 'center',
      }}
      {...chipSelectOption}
    />
  );
};

export default memo(TableCellStatus);
