// React
import { memo, ReactElement } from 'react';

// MUI
import { Chip, ChipProps } from '@mui/material';

import { FunctionVoidWithParams } from '@/common/types';
import LEVEL, { LevelType } from '@/common/constants/level';

export interface TableCellLevelProps {
  level?: LevelType;
  SelectOption?: ReactElement;
  ChipProps?: ChipProps;
  onClickSelectOption?: FunctionVoidWithParams<string>;
}

const TableCellLevel = ({ level, SelectOption, ChipProps }: TableCellLevelProps) => {
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
