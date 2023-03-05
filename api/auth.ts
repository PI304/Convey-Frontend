import { request } from './core';

const baseUrl = '/auth';

export const postLogin = (data: RequestAuth.Login) => {
  const url = `${baseUrl}/login/admin`;
  return request.post<ResponseAuth.Login, RequestAuth.Login>(url, data);
};
