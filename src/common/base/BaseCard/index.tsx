import LinearProgress from '@mui/material/LinearProgress';
import { PaperProps } from '@mui/material/Paper';

import { IPropsChildren } from '@/common/types';
import { CardBoxStyled, CardPaperStyled } from './styled';

export interface BaseCardProps extends IPropsChildren, PaperProps {
  loading?: boolean;
}

const BaseCard = ({ children, loading, ...paperProps }: BaseCardProps) => {
  return (
    <CardBoxStyled borderRadius="20px">
      {loading && <LinearProgress />}
      <CardPaperStyled {...paperProps}>{children}</CardPaperStyled>
    </CardBoxStyled>
  );
};
export default BaseCard;
