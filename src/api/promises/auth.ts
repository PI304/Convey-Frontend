import { request } from '@api';

const baseUrl = '/auth';

export const postLogin = (data: RequestAuth.PostLogin) => {
  const url = `${baseUrl}/login/admin`;
  return request.post<ResponseAuth.PostLogin, RequestAuth.PostLogin>(url, data);
};

export const postRefresh = () => {
  const url = `${baseUrl}/token/refresh`;
  return request.post<ResponseAuth.PostRefresh>(url);
};
