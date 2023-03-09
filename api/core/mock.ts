/* eslint-disable @typescript-eslint/no-empty-function */
import axios from 'axios';
import { GenericInstance } from '_types/axios/core';

export const mock: GenericInstance = axios.create({
  baseURL: '/',
  timeout: 2500,
  headers: { 'Content-Type': 'application/json' },
});

mock.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

mock.interceptors.response.use(
  (response) => {
    if (response.data.results) return response.data.results;
    return response.data;
  },
  (error) => {
    console.log(error);
    return new Promise(() => {});
  },
);
