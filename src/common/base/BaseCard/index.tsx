import { LinearProgress, PaperProps } from '@mui/material';
import { PropsChildren } from '@/common/types';
import { CardBoxStyled, CardPaperStyled } from './styled';

export interface BaseCardProps extends PropsChildren, PaperProps {
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
