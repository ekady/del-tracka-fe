import { IAutocompleteOptions, IInformationWithColor } from '@/common/types';

export type LevelType = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type LevelIndexable = {
  [key in LevelType]: IInformationWithColor;
};

const LEVEL: LevelIndexable = {
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
  MEDIUM: {
    color: '#FFF9C3',
    textColor: '#000',
    name: 'Medium',
    value: 'MEDIUM',
  },
  LOW: {
    color: '#FFF',
    textColor: '#000',
    name: 'Low',
    value: 'LOW',
  },
};

export const levelList: readonly IAutocompleteOptions[] = Object.keys(LEVEL).map((level) => ({
  value: LEVEL[level as LevelType].value as string,
  label: LEVEL[level as LevelType].name,
}));

export default LEVEL;
