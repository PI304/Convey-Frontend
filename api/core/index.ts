/* eslint-disable @typescript-eslint/no-empty-function */
import axios from 'axios';
import { GenericInstance } from '../../@types/axios/core';

export const request: GenericInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACK_END_BASE_URL,
  timeout: 2500,
  headers: { 'Content-Type': 'application/json' },
});

request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.log(error);
    return new Promise(() => {});
  },
);
