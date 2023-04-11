import { request } from '@api';

const baseUrl = '/survey-packages';

/**
 * Packages
 */

export const getPackages = (page: number) => {
  const url = `${baseUrl}?page=${page}`;
  return request.get<ResponsePackages.Get>(url);
};

export const getPackageById = (packageId: number) => {
  const url = `${baseUrl}/${packageId}`;
  return request.get<ResponsePackages.GetById>(url);
};

export const getPackagesDownload = (packageId: number) => {
  const url = `${baseUrl}/${packageId}/download`;
  return request.get<ResponsePackages.GetDownload>(url, {
    responseType: 'arraybuffer',
  });
};

export const postPackage = (data: RequestPackages.Post) => {
  const url = `${baseUrl}`;
  return request.post<ResponsePackages.Post, RequestPackages.Post>(url, data);
};

export const patchPackage = (packageId: number, data: RequestPackages.Patch) => {
  const url = `${baseUrl}/${packageId}`;
  return request.patch<ResponsePackages.Patch, RequestPackages.Patch>(url, data);
};

export const deletePackage = (packageId: number) => {
  const url = `${baseUrl}/${packageId}`;
  return request.delete(url);
};

/**
 * Parts
 */

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

/**
 * Subjects
 */

export const getSubjects = (partId: number) => {
  const url = `${baseUrl}/parts/${partId}/subjects`;
  return request.get<ResponseSubjects.GetAllByPartId>(url);
};

export const postSubject = (partId: number, data: RequestSubjects.Post) => {
  const url = `${baseUrl}/parts/${partId}/subjects`;
  return request.post<ResponseSubjects.Post, RequestSubjects.Post>(url, data);
};

export const deleteSubject = (subjectId: number) => {
  const url = `${baseUrl}/parts/subjects/${subjectId}`;
  return request.delete(url);
};

/**
 * Included Surveys
 */

export const putIncludedSurveys = (subjectId: number, data: RequestSubjects.PutIncludedSurveys) => {
  const url = `${baseUrl}/parts/subjects/${subjectId}`;
  return request.put<ResponseSubjects.PutIncludedSurveys, RequestSubjects.PutIncludedSurveys>(url, data);
};

export const getIncludedSurveys = (subjectId: number) => {
  const url = `${baseUrl}/parts/subjects/${subjectId}`;
  return request.get<ResponseSubjects.GetIncludedSurveysBySubjectId>(url);
};
