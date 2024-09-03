import LinearProgress from '@mui/material/LinearProgress';
import { PaperProps } from '@mui/material/Paper';

import { IPropsChildren } from '@/app/_common/types';

import { CardBoxStyled, CardPaperStyled } from './styled';

export interface IBaseCardProps extends IPropsChildren, PaperProps {
  loading?: boolean;
}

const BaseCard = ({ children, loading, ...paperProps }: IBaseCardProps) => {
  return (
    <CardBoxStyled borderRadius="20px">
      {loading && <LinearProgress />}
      <CardPaperStyled {...paperProps}>{children}</CardPaperStyled>
    </CardBoxStyled>
  );
};
export default BaseCard;
