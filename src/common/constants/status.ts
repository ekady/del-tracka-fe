import { AutocompleteOptions, InformationWithColor } from '@/types';

export type StatusType = 'OPEN' | 'IN_PROGRESS' | 'REVIEW' | 'CLOSE' | 'HOLD';

export type StatusIndexable = {
  [key in StatusType]: InformationWithColor;
};

const STATUS: StatusIndexable = {
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
    value: 'UNDER_REVIEW',
    name: 'Under Review',
    color: '#7abce2',
    textColor: '#000',
  },
  CLOSE: {
    value: 'CLOSE',
    name: 'Close',
    color: '#00b1d4',
    textColor: '#fff',
  },
  HOLD: {
    value: 'HOLD',
    name: 'Hold',
    color: '#dea14b',
    textColor: '#000',
  },
};

export const statusList: readonly AutocompleteOptions[] = Object.keys(STATUS).map((status) => ({
  value: STATUS[status as StatusType].value as string,
  label: STATUS[status as StatusType].name as string,
}));

export default STATUS;
