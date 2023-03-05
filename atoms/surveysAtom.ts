import produce from 'immer';
import { atom } from 'jotai';
import { QuestionTypes } from '@constants';
import { Survey } from '@models';

export const surveysAtom = atom<RequestSurveys.Put | null>([new Survey(QuestionTypes.likert)]);

export const writeSurveyTitleAtom = atom(null, (get, set, update: WriteSurveysTitleAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    draft[update.idx].title = update.title;
  });
  set(surveysAtom, newSurveys);
});

export const writeSurveyDescriptionAtom = atom(null, (get, set, update: WriteSurveysDescriptionAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    draft[update.idx].description = update.description;
  });
  set(surveysAtom, newSurveys);
});
