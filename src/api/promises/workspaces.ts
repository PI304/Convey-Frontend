import { request } from '@api';

const baseUrl = '/workspaces';

/**
 * Workspaces
 */

export const getWorkspaces = () => {
  const url = `${baseUrl}`;
  return request.get<ResponseWorkspaces.Get>(url);
};

export const getWorkspaceById = (workspaceId: number) => {
  const url = `${baseUrl}/${workspaceId}`;
  return request.get<ResponseWorkspaces.GetById>(url);
};

export const postWorkspace = (data: RequestWorkspaces.Post) => {
  const url = `${baseUrl}`;
  return request.post<ResponseWorkspaces.Post, RequestWorkspaces.Post>(url, data);
};

export const deleteWorkspace = (workspaceId: number) => {
  const url = `${baseUrl}/${workspaceId}`;
  return request.delete(url);
};

/**
 * Packages
 */

export const postPackagesToWorkspace = (workspaceId: number, data: RequestWorkspaces.PostPackages) => {
  const url = `${baseUrl}/${workspaceId}/survey-packages`;
  return request.post<ResponseWorkspaces.PostPackages, RequestWorkspaces.PostPackages>(url, data);
};

export const deletePackageInWorkspace = (workspaceId: number, packageId: number) => {
  const url = `${baseUrl}/${workspaceId}/survey-packages/${packageId}`;
  return request.delete(url);
};

/**
 * Routines
 */

export const getRoutines = (workspaceId: number) => {
  const url = `${baseUrl}/${workspaceId}/routines`;
  return request.get<ResponseWorkspaces.GetRoutinesById>(url);
};

export const postRoutines = (workspaceId: number, data: RequestWorkspaces.PostRoutines) => {
  const url = `${baseUrl}/${workspaceId}/routines`;
  return request.post<ResponseWorkspaces.PostRoutines, RequestWorkspaces.PostRoutines>(url, data);
};

/**
 * Routine Details
 */

export const getRoutineDetails = (routineDetailId: number) => {
  const url = `${baseUrl}/routine-details/${routineDetailId}`;
  return request.get<ResponseWorkspaces.GetRoutineDetailsById>(url);
};

export const postRoutineDetails = (routineId: number, data: RequestWorkspaces.PostRoutineDetails) => {
  const url = `${baseUrl}/routines/${routineId}/routine-details`;
  return request.post<ResponseWorkspaces.PostRoutineDetails, RequestWorkspaces.PostRoutineDetails>(url, data);
};

export const deleteRoutineDetails = (routineDetailId: number) => {
  const url = `${baseUrl}/routine-details/${routineDetailId}`;
  return request.delete(url);
};
