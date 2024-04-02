import { toast } from 'react-toastify';
import ErrorToastContainer, { IErrorToastContainerProps } from '.';

const toastError = (payload: IErrorToastContainerProps) => {
  toast.error(<ErrorToastContainer {...payload} />, {
    pauseOnHover: true,
    closeOnClick: false,
    closeButton: true,
    icon: false,
  });
};

export default toastError;
