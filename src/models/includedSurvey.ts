import { immerable } from 'immer';

export class IncludedSurvey implements IncludedSurveyType {
  [immerable] = true;

  number: number;
  title: string;
  survey: number;

  constructor(includedSurveyIdx: number, surveyIdx: number) {
    this.number = includedSurveyIdx;
    this.title = '';
    this.survey = surveyIdx;
  }

  setFromServerData(number: number, title: string, survey: number) {
    this.number = number;
    this.title = title;
    this.survey = survey;
  }
}
