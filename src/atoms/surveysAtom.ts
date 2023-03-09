import produce from 'immer';
import { atom } from 'jotai';
import { QuestionTypes } from '@constants';
import { Choice, Question, Survey } from '@models';
import { AddSurveyAtomType, AddQuestionAtomType, AddChoiceAtomType, AddCommonChoiceAtomType } from '_types/client';

export const surveysAtom = atom<RequestSurveys.Put | null>([]);

export const addSurveyAtom = atom(null, (get, set, update: AddSurveyAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    draft.push(new Survey(update.questionType));
  });
  set(surveysAtom, newSurveys);
});

export const removeSurveyAtom = atom(null, (get, set, update: RemoveSurveyAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    draft.splice(update.surveyIdx, 1);
  });
  set(surveysAtom, newSurveys);
});

export const writeSurveyTitleAtom = atom(null, (get, set, update: WriteSurveyTitleAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    draft[update.surveyIdx].title = update.title;
  });
  set(surveysAtom, newSurveys);
});

export const writeSurveyDescriptionAtom = atom(null, (get, set, update: WriteSurveyDescriptionAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    draft[update.surveyIdx].description = update.description;
  });
  set(surveysAtom, newSurveys);
});

export const writeQuestionNumberAtom = atom(null, (get, set, update: WriteQuestionNumberAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    draft[update.surveyIdx].questions[update.questionIdx].number = update.number;
  });
  set(surveysAtom, newSurveys);
});

export const writeQuestionContentAtom = atom(null, (get, set, update: WriteQuestionContentAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    draft[update.surveyIdx].questions[update.questionIdx].content = update.content;
  });
  set(surveysAtom, newSurveys);
});

export const addQuestionAtom = atom(null, (get, set, update: AddQuestionAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    const questions = draft[update.surveyIdx].questions;
    questions.push(new Question(questions.length + 1));
  });
  set(surveysAtom, newSurveys);
  if (update.questionType === QuestionTypes.longAnswer) return;
  set(addChoiceAtom, { ...update, questionIdx: surveys[update.surveyIdx].questions.length });
});

export const removeQuestionAtom = atom(null, (get, set, update: RemoveQuestionAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    const questions = draft[update.surveyIdx].questions;
    if (questions.length === 1) return;
    questions.splice(update.questionIdx, 1);
  });
  set(surveysAtom, newSurveys);
});

export const writeChoiceNumberAtom = atom(null, (get, set, update: WriteChoiceNumberAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    const choices = draft[update.surveyIdx].questions[update.questionIdx].choices;
    if (!choices) return;
    choices[update.choiceIdx].number = update.number;
  });
  set(surveysAtom, newSurveys);
});

export const writeChoiceContentAtom = atom(null, (get, set, update: WriteChoiceContentAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    const choices = draft[update.surveyIdx].questions[update.questionIdx].choices;
    if (!choices) return;
    choices[update.choiceIdx].content = update.content;
  });
  set(surveysAtom, newSurveys);
});

export const addChoiceAtom = atom(null, (get, set, update: AddChoiceAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    const choices = draft[update.surveyIdx].questions[update.questionIdx].choices;
    console.log(draft[update.surveyIdx].questions[update.questionIdx].content);
    if (!choices)
      draft[update.surveyIdx].questions[update.questionIdx].choices = [new Choice(1, update.questionType, false)];
    else choices.push(new Choice(choices.length + 1, update.questionType, false));
  });
  set(surveysAtom, newSurveys);
});

export const removeChoiceAtom = atom(null, (get, set, update: RemoveChoiceAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    const choices = draft[update.surveyIdx].questions[update.questionIdx].choices;
    if (!choices || choices.length === 1) return;
    choices.splice(update.choiceIdx, 1);
  });
  set(surveysAtom, newSurveys);
});

export const writeCommonChoiceNumberAtom = atom(null, (get, set, update: WriteCommonChoiceNumberAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    const commonChoices = draft[update.surveyIdx].commonChoices;
    if (!commonChoices) return;
    commonChoices[update.choiceIdx].number = update.number;
  });
  set(surveysAtom, newSurveys);
});

export const writeCommonChoiceContentAtom = atom(null, (get, set, update: WriteCommonChoiceContentAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    const commonChoices = draft[update.surveyIdx].commonChoices;
    if (!commonChoices) return;
    commonChoices[update.choiceIdx].content = update.content;
  });
  set(surveysAtom, newSurveys);
});

export const addCommonChoiceAtom = atom(null, (get, set, update: AddCommonChoiceAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    const commonChoices = draft[update.surveyIdx].commonChoices;
    if (!commonChoices) draft[update.surveyIdx].commonChoices = [new Choice(1, update.questionType, true)];
    else commonChoices.push(new Choice(commonChoices.length + 1, update.questionType, true));
  });
  set(surveysAtom, newSurveys);
});

export const removeCommonChoiceAtom = atom(null, (get, set, update: RemoveCommonChoiceAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    const commonChoices = draft[update.surveyIdx].commonChoices;
    if (!commonChoices || commonChoices.length === 1) return;
    commonChoices.splice(update.choiceIdx, 1);
  });
  set(surveysAtom, newSurveys);
});

export const addNumberDescFormAtom = atom(null, (get, set, update: AddDescFormAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    const choices = draft[update.surveyIdx].questions[update.questionIdx].choices;
    if (!choices) return;
    const descForm = choices[update.choiceIdx].descForm;
    if (!descForm) choices[update.choiceIdx].descForm = '%d';
    else choices[update.choiceIdx].descForm += '%d';
  });
  set(surveysAtom, newSurveys);
});

export const addStringDescFormAtom = atom(null, (get, set, update: AddDescFormAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    const choices = draft[update.surveyIdx].questions[update.questionIdx].choices;
    if (!choices) return;
    const descForm = choices[update.choiceIdx].descForm;
    if (!descForm) choices[update.choiceIdx].descForm = '%s';
    else choices[update.choiceIdx].descForm += '%s';
  });
  set(surveysAtom, newSurveys);
});

export const addStaticDescFormAtom = atom(null, (get, set, update: AddStaticDescFormAtomType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    const choices = draft[update.surveyIdx].questions[update.questionIdx].choices;
    if (!choices) return;
    const descForm = choices[update.choiceIdx].descForm;
    if (!descForm) choices[update.choiceIdx].descForm = update.content;
    else choices[update.choiceIdx].descForm += update.content;
  });
  set(surveysAtom, newSurveys);
});

export const eraseDescFormAtom = atom(null, (get, set, update: EraseDescFormType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    const choices = draft[update.surveyIdx].questions[update.questionIdx].choices;
    if (!choices) return;
    const descForm = choices[update.choiceIdx].descForm;
    if (!descForm) return;
    choices[update.choiceIdx].descForm = descForm
      .split(/(%d|%s)/g)
      .filter((v) => v !== '')
      .slice(0, -1)
      .join('');
  });
  set(surveysAtom, newSurveys);
});

export const toggleChoiceIsDescriptiveAtom = atom(null, (get, set, update: ToggleChoiceIsDescriptiveType) => {
  const surveys = get(surveysAtom);
  if (!surveys) return;
  const newSurveys = produce(surveys, (draft) => {
    const choices = draft[update.surveyIdx].questions[update.questionIdx].choices;
    if (!choices) return;
    if (choices[update.choiceIdx].isDescriptive) choices[update.choiceIdx].descForm = null;
    choices[update.choiceIdx].isDescriptive = !choices[update.choiceIdx].isDescriptive;
  });
  set(surveysAtom, newSurveys);
});

export const setSurveysFromServerDataAtom = atom(null, (get, set, update: SetFromServerDataType) => {
  const surveys = update.surveys;
  const newSurveys: SurveyType[] = [];
  surveys.forEach((survey) => {
    const questionType = survey.questionType as ValueOf<typeof QuestionTypes>;
    const newSurvey = new Survey(questionType);
    newSurvey.setFromServerData(survey);
    newSurveys.push(newSurvey);
  });
  set(surveysAtom, newSurveys);
});
