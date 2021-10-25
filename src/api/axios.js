import axios from 'axios';

import { authHeaders } from '../lib/storage';

const axiosOnResponseOk = (response) => response;

const axiosOnResponseError = (logout) => (error) => {
  if (error.response && error.response.status === 401) {
    logout();
  }

  return Promise.reject(error);
};

const axiosInit = (logout) => {
  axios.interceptors.request.use(async (config) => {
    config.headers = await authHeaders();
    return config;
  },
  (error) => Promise.reject(error));

  axios.interceptors.response.use(axiosOnResponseOk, axiosOnResponseError(logout));
};

export default axiosInit;
