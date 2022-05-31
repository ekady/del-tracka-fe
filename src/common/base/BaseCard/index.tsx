import { PropsChildren } from '@/types';
import { LinearProgress, PaperProps } from '@mui/material';
import { CardBoxStyled, CardPaperStyled } from './styled';

export type BaseCardProps = PropsChildren &
  PaperProps & {
    loading?: boolean;
  };

const BaseCard = ({ children, loading, ...paperProps }: BaseCardProps) => {
  return (
    <CardBoxStyled borderRadius="20px">
      {loading && <LinearProgress />}
      <CardPaperStyled {...paperProps}>{children}</CardPaperStyled>
    </CardBoxStyled>
  );
};
export default BaseCard;
