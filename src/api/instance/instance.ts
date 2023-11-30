import axios from 'axios';

import { accessTokenService } from '../accessTokenService';

const accessToken = accessTokenService.getToken();

export const instance = axios.create({
  baseURL: 'https://card-backend-2hok.onrender.com/',
  withCredentials: false,
});

instance.interceptors.request.use(
  config => {
    if (accessToken) {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
