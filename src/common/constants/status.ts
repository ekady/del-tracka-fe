import { IAutocompleteOptions, IInformationWithColor } from '@/common/types';

export type TStatusType = 'OPEN' | 'IN_PROGRESS' | 'REVIEW' | 'READY_FOR_TEST' | 'CLOSED' | 'FAILED' | 'HOLD';

export type TStatusIndexable = {
  [key in TStatusType]: IInformationWithColor;
};

const STATUS: TStatusIndexable = {
  OPEN: {
    value: 'OPEN',
    name: 'Open',
    color: '#1C1632',
    textColor: '#fff',
  },
  IN_PROGRESS: {
    value: 'IN_PROGRESS',
    name: 'In Progress',
    color: '#606989',
    textColor: '#fff',
  },
  REVIEW: {
    value: 'REVIEW',
    name: 'Review',
    color: '#7abce2',
    textColor: '#fff',
  },
  CLOSED: {
    value: 'CLOSED',
    name: 'Closed',
    color: '#00b1d4',
    textColor: '#fff',
  },
  READY_FOR_TEST: {
    value: 'READY_FOR_TEST',
    name: 'Ready',
    color: '#008000',
    textColor: '#fff',
  },
  FAILED: {
    value: 'FAILED',
    name: 'Failed',
    color: '#890B0B',
    textColor: '#fff',
  },
  HOLD: {
    value: 'HOLD',
    name: 'Hold',
    color: '#dea14b',
    textColor: '#000',
  },
};

export const statusList: readonly IAutocompleteOptions[] = Object.keys(STATUS).map((status) => ({
  value: STATUS[status as TStatusType].value as string,
  label: STATUS[status as TStatusType].name,
}));

export default STATUS;
