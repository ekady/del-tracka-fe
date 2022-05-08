import { InformationWithColor } from '@/types';

export type StatusType = 'OPEN' | 'IN_PROGRESS' | 'REQUEST_REVIEW' | 'UNDER_REVIEW' | 'CLOSE' | 'HOLD';

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
  REQUEST_REVIEW: {
    value: 'REQUEST_REVIEW',
    name: 'Request Review',
    color: '#b1c9e7',
    textColor: '#000',
  },
  UNDER_REVIEW: {
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

export default STATUS;
