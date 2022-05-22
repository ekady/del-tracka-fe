import * as http from 'axios';

// import store from '@/common/redux/store';

import { toast } from 'react-toastify';

const config = {
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? '//api.local/',
};

const axios = http.default.create(config);

axios.interceptors.request.use(
  (config) => {
    // const token = store.getState().auth?.token ?? null;
    config.headers.Authorization = '';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== undefined) {
      toast.error(error.response.statusText);
    }

    return Promise.reject(error);
  },
);

export default axios;
