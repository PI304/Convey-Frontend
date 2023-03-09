import { immerable } from 'immer';
import { QuestionTypes } from '@constants';
import { Choice, Question } from '@models';

export class Survey implements SurveyType {
  [immerable] = true;

  title = '제목';
  description = '설명';
  questionType: ValueOf<typeof QuestionTypes>;
  commonChoices: ChoiceType[] | null = null;
  questions: QuestionType[] = [
    {
      number: 1,
      content: '질문1',
      isRequired: true,
      linkedSector: null,
      choices: null,
    },
  ];

  constructor(questionType: ValueOf<typeof QuestionTypes>) {
    this.questionType = questionType;

    switch (questionType) {
      case QuestionTypes.likert:
        this.initializeLikert();
        break;
      case QuestionTypes.shortAnswer:
        this.initializeShortAnswer();
        break;
      case QuestionTypes.singleSelect:
      case QuestionTypes.multiSelect:
        this.initializeSelect();
        break;
      case QuestionTypes.extent:
        this.initializeExtent();
        break;
      case QuestionTypes.longAnswer:
        this.initializeLongAnswer();
        break;
    }
  }

  initializeLikert() {
    this.commonChoices = [
      {
        number: 1,
        content: '매우 그렇다',
        isDescriptive: false,
        descForm: null,
      },
      {
        number: 2,
        content: '그렇다',
        isDescriptive: false,
        descForm: null,
      },
      {
        number: 3,
        content: '보통이다',
        isDescriptive: false,
        descForm: null,
      },
      {
        number: 4,
        content: '그렇지 않다',
        isDescriptive: false,
        descForm: null,
      },
      {
        number: 5,
        content: '매우 그렇지 않다',
        isDescriptive: false,
        descForm: null,
      },
    ];
  }

  initializeShortAnswer() {
    this.questions[0].choices = [
      {
        number: 1,
        content: null,
        isDescriptive: true,
        descForm: null,
      },
    ];
  }

  initializeSelect() {
    this.questions[0].choices = [
      {
        number: 1,
        content: '선택1',
        isDescriptive: false,
        descForm: null,
      },
    ];
  }

  initializeExtent() {
    this.commonChoices = [
      {
        number: 1,
        content: '낮음',
        isDescriptive: false,
        descForm: null,
      },
      {
        number: 2,
        content: '높음',
        isDescriptive: false,
        descForm: null,
      },
    ];
  }

  // eslint-disable-next-line no-restricted-syntax, @typescript-eslint/no-empty-function
  initializeLongAnswer() {}

  setFromServerData(survey: ResponseSurveyType) {
    this.title = survey.title;
    this.description = survey.description;
    const commonChoices: ChoiceType[] = [];
    survey.commonChoices?.forEach((choice, idx) => {
      const newCommonChoice = new Choice(idx, this.questionType, true);
      newCommonChoice.setFromServerData(choice);
      commonChoices.push(newCommonChoice);
    });
    this.commonChoices = commonChoices.length ? commonChoices : null;
    const questions: QuestionType[] = [];
    survey.questions.forEach((question, idx) => {
      const newQuestion = new Question(idx);
      newQuestion.setFromServerData(question, this.questionType);
      questions.push(newQuestion);
    });
    this.questions = questions;
  }
}
