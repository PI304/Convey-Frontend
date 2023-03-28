/* eslint-disable @typescript-eslint/no-empty-function */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { authAtom, store } from '@atoms';
import { StorageKeys } from '@constants';
import { GenericInstance } from '_types/dep/axios';

export const request: GenericInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_END_BASE_URL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

request.interceptors.request.use(
  (config) => {
    const accessToken = store.get(authAtom)?.accessToken;
    if (accessToken) setAuthorizedConfig(config, accessToken);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    if (response.data.results) return response.data.results;
    return response.data;
  },
  (error: AxiosError) => {
    handleError(error);
    return new Promise(() => {});
  },
);

const setAuthorizedConfig = (config: AxiosRequestConfig, authToken: string) => {
  config.headers = { Authorization: `Bearer ${authToken}` };
  config.withCredentials = true;
};

const handleError = (error: AxiosError) => {
  switch (error?.response?.status) {
    case 401:
      sessionStorage.removeItem(StorageKeys.accessToken);
      history.go();
      break;
    case 404:
      console.log(error);
      break;
    case 409:
      alert('중복된 데이터입니다.');
      break;
    default:
      alert(error);
  }
};
