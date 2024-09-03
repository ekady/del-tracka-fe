import { IAutocompleteOptions, IInformationWithColor } from '@/app/_common/types';

export type TLevelType = 'CRITICAL' | 'HIGH' | 'NORMAL' | 'LOW';

export type TLevelIndexable = {
  [key in TLevelType]: IInformationWithColor;
};

const LEVEL: TLevelIndexable = {
  CRITICAL: {
    color: '#E54242',
    textColor: '#fff',
    name: 'Critical',
    value: 'CRITICAL',
  },
  HIGH: {
    color: '#890B0B',
    textColor: '#fff',
    name: 'High',
    value: 'HIGH',
  },
  NORMAL: {
    color: '#FFF9C3',
    textColor: '#000',
    name: 'Normal',
    value: 'NORMAL',
  },
  LOW: {
    color: '#FFF',
    textColor: '#000',
    name: 'Low',
    value: 'LOW',
  },
};

export const levelList: readonly IAutocompleteOptions[] = Object.keys(LEVEL).map((level) => ({
  value: LEVEL[level as TLevelType].value as string,
  label: LEVEL[level as TLevelType].name,
}));

export default LEVEL;
