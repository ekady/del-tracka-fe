import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import { IPropsChildren } from '@/common/types';

export interface IButtonLoadingProps extends ButtonProps, IPropsChildren {
  loading?: boolean;
  loadingSize?: string | number;
}

const ButtonLoading = (props: IButtonLoadingProps) => {
  const { children, loading, loadingSize, ...buttonProps } = props;

  return (
    <Button disabled={!!loading} {...buttonProps}>
      {loading ? <CircularProgress size={loadingSize ?? 20} /> : children}
    </Button>
  );
};

export default ButtonLoading;
