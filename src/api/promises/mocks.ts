import { mock } from '@api';

const baseUrl = '/api';

export const getMockSurveysById = () => {
  const url = `${baseUrl}/surveys`;
  return mock.get<ResponseSurveys.GetById>(url);
};
