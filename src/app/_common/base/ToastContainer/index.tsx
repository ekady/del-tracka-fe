'use client';

import { ToastContainer as ReactToastify } from 'react-toastify';

const ToastContainer = () => (
  <ReactToastify
    position="top-center"
    autoClose={8000}
    newestOnTop
    closeOnClick
    closeButton={false}
    pauseOnFocusLoss={false}
    theme="colored"
  />
);

export default ToastContainer;
