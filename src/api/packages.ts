import { request } from './core';

const baseUrl = '/survey-packages';

export const getPackages = () => {
  const url = `${baseUrl}`;
  return request.get<ResponsePackages.Get>(url);
};

export const postPackage = (data: RequestPackages.Post) => {
  const url = `${baseUrl}`;
  return request.post<ResponsePackages.Post, RequestPackages.Post>(url, data);
};

export const deletePackage = (packageId: number) => {
  const url = `${baseUrl}/${packageId}`;
  return request.delete(url);
};
