// React
import { memo, ReactElement } from 'react';

// MUI
import Chip, { ChipProps } from '@mui/material/Chip';

import { TFunctionVoidWithParams } from '@/common/types';
import LEVEL, { TLevelType } from '@/common/constants/level';

export interface ITableCellLevelProps {
  level?: TLevelType;
  SelectOption?: ReactElement;
  ChipProps?: ChipProps;
  onClickSelectOption?: TFunctionVoidWithParams<string>;
}

const TableCellLevel = ({ level, SelectOption, ChipProps }: ITableCellLevelProps) => {
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
      label={level ?? ''}
      sx={{
        background: level ? LEVEL[level].color : 'white',
        color: level ? LEVEL[level].textColor : 'black',
        border: '1px solid #ccc',
        width: 130,
        fontWeight: 'bold',
        justifyContent: 'center',
      }}
      {...chipSelectOption}
    />
  );
};

export default memo(TableCellLevel);
