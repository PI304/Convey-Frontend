import { request } from './core';

const baseUrl = '/survey-packages/parts';

export const getSubjects = (partId: number) => {
  const url = `${baseUrl}/${partId}/subjects`;
  return request.get<ResponseSubjects.GetAllByPartId>(url);
};

export const postSubject = (partId: number, data: RequestSubjects.Post) => {
  const url = `${baseUrl}/${partId}/subjects`;
  return request.post<ResponseSubjects.Post, RequestSubjects.Post>(url, data);
};

export const putIncludedSurveys = (subjectId: number, data: RequestSubjects.PutIncludedSurveys) => {
  const url = `${baseUrl}/subjects/${subjectId}`;
  return request.put<ResponseSubjects.PutIncludedSurveys, RequestSubjects.PutIncludedSurveys>(url, data);
};

export const getIncludedSurveys = (subjectId: number) => {
  const url = `${baseUrl}/subjects/${subjectId}`;
  return request.get<ResponseSubjects.GetIncludedSurveysBySubjectId>(url);
};

export const deleteSubject = (subjectId: number) => {
  const url = `${baseUrl}/subjects/${subjectId}`;
  return request.delete(url);
};
