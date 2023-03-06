import { request } from './core';

const baseUrl = '/surveys';

export const getSurveys = (page: number) => {
  const url = `${baseUrl}`;
  return request.get<ResponseSurveys.Get>(url);
};

export const getSurveysById = (id: number) => {
  const url = `${baseUrl}/${id}`;
  return request.get<ResponseSurveys.GetById>(url);
};

export const postSurveys = (data: RequestSurveys.Post) => {
  const url = `${baseUrl}`;
  return request.post<ResponseSurveys.Post, RequestSurveys.Post>(url, data);
};

export const patchSurveys = (id: number, data: RequestSurveys.Patch) => {
  const url = `${baseUrl}/${id}`;
  return request.patch<ResponseSurveys.Patch, RequestSurveys.Patch>(url, data);
};

export const putSurveys = (id: number, data: RequestSurveys.Put) => {
  const url = `${baseUrl}/${id}`;
  return request.put<ResponseSurveys.Put, RequestSurveys.Put>(url, data);
};

export const deleteSurveys = (id: number) => {
  const url = `${baseUrl}/${id}`;
  return request.delete(url);
};
