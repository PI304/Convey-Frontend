import { request } from '@api';

const baseUrl = '/survey-packages';

export const getParts = (packageId: number) => {
  const url = `${baseUrl}/${packageId}/parts`;
  return request.get<ResponseParts.GetAllByPackageId>(url);
};

export const postPart = (packageId: number, data: RequestParts.Post) => {
  const url = `${baseUrl}/${packageId}/parts`;
  return request.post<ResponseParts.Post, RequestParts.Post>(url, data);
};

export const deletePart = (partId: number) => {
  const url = `${baseUrl}/parts/${partId}`;
  return request.delete(url);
};
