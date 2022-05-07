import { InformationWithColor } from '../types';

type Color = {
  [key: string]: InformationWithColor;
};

const level: Color = {
  CRITICAL: {
    color: '#E54242',
    textColor: '#fff',
  },
  HIGH: {
    color: '#890B0B',
    textColor: '#fff',
  },
  MEDIUM: {
    color: '#FFF9C3',
    textColor: '#000',
  },
  NORMAL: {
    color: '#EEEEEE',
    textColor: '#000',
  },
  LOW: {
    color: '#FFF',
    textColor: '#000',
  },
};

export default level;
