import { IAutocompleteOptions, IInformationWithColor } from '@/common/types';

export type StatusType = 'OPEN' | 'IN_PROGRESS' | 'REVIEW' | 'CLOSED' | 'HOLD';

export type StatusIndexable = {
  [key in StatusType]: IInformationWithColor;
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
  HOLD: {
    value: 'HOLD',
    name: 'Hold',
    color: '#dea14b',
    textColor: '#000',
  },
};

export const statusList: readonly IAutocompleteOptions[] = Object.keys(STATUS).map((status) => ({
  value: STATUS[status as StatusType].value as string,
  label: STATUS[status as StatusType].name as string,
}));

export default STATUS;
