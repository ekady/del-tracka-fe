import { toast } from 'react-toastify';
import ErrorToastContainer, { ErrorToastContainerProps } from '.';

const toastError = (payload: ErrorToastContainerProps) => {
  toast.error(<ErrorToastContainer {...payload} />, {
    pauseOnHover: true,
    closeOnClick: false,
    closeButton: true,
    icon: false,
  });
};

export default toastError;
