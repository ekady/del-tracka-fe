import { PropsChildren } from '@/common/types';
import { Button, ButtonProps, CircularProgress } from '@mui/material';

export type ButtonLoadingProps = ButtonProps &
  PropsChildren & {
    loading?: boolean;
    loadingSize?: string | number;
  };

const ButtonLoading = (props: ButtonLoadingProps) => {
  const { children, loading, loadingSize, ...buttonProps } = props;

  return (
    <Button disabled={!!loading} {...buttonProps}>
      {loading ? <CircularProgress size={loadingSize ?? 20} /> : children}
    </Button>
  );
};

export default ButtonLoading;
