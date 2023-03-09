import { mock } from './core';

const baseUrl = '/api';

export const getMockSurveysById = () => {
  const url = `${baseUrl}/surveys`;
  return mock.get<ResponseSurveys.GetById>(url);
};
