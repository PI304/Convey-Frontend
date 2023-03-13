import { request } from './core';

const baseUrl = '/workspaces';

export const getWorkspaces = () => {
  const url = `${baseUrl}`;
  return request.get<ResponseWorkspaces.Get>(url);
};

export const getWorkspaceById = (workspaceId: number) => {
  const url = `${baseUrl}/${workspaceId}`;
  return request.get<ResponseWorkspaces.GetById>(url);
};

export const getRoutinesById = (workspaceId: number) => {
  const url = `${baseUrl}/${workspaceId}/routines`;
  return request.get<ResponseWorkspaces.GetRoutinesById>(url);
};

export const getRoutineDetailsById = (routineDetailId: number) => {
  const url = `${baseUrl}/routine-details/${routineDetailId}`;
  return request.get<ResponseWorkspaces.GetRoutineDetailsById>(url);
};

export const postWorkspace = (data: RequestWorkspaces.Post) => {
  const url = `${baseUrl}`;
  return request.post<ResponseWorkspaces.Post, RequestWorkspaces.Post>(url, data);
};

export const postRoutines = (workspaceId: number, data: RequestWorkspaces.PostRoutines) => {
  const url = `${baseUrl}/${workspaceId}/routines`;
  return request.post<ResponseWorkspaces.PostRoutines, RequestWorkspaces.PostRoutines>(url, data);
};

export const postRoutineDetails = (data: RequestWorkspaces.PostRoutineDetails) => {
  const url = `${baseUrl}/routine-details`;
  return request.post<ResponseWorkspaces.PostRoutineDetails, RequestWorkspaces.PostRoutineDetails>(url, data);
};

export const postPackagesToWorkspace = (workspaceId: number, data: RequestWorkspaces.PostPackages) => {
  const url = `${baseUrl}/${workspaceId}/survey-packages`;
  return request.post<ResponseWorkspaces.PostPackages, RequestWorkspaces.PostPackages>(url, data);
};

export const deleteWorkspaceById = (workspaceId: number) => {
  const url = `${baseUrl}/${workspaceId}`;
  return request.delete(url);
};

export const deleteRoutineDetailsById = (routineDetailId: number) => {
  const url = `${baseUrl}/routine-details/${routineDetailId}`;
  return request.delete(url);
};

export const deletePackageInWorkspaceById = (packageId: number) => {
  const url = `${baseUrl}/survey-packages/${packageId}`;
  return request.delete(url);
};
