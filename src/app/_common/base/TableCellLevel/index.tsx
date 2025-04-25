import { memo, ReactElement } from 'react';

import Chip, { ChipProps } from '@mui/material/Chip';

import LEVEL, { TLevelType } from '@/app/_common/constants/level.constant';

export interface ITableCellLevelProps {
  level?: TLevelType;
  SelectOption?: ReactElement;
  ChipProps?: ChipProps;
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
