import { immerable } from 'immer';
import { QuestionTypes } from '../constants/questionTypes';

export class Survey implements SurveyType {
  [immerable] = true;

  title = '제목';
  description = '설명';
  questionType = '';
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
    this.questions = [
      ...this.questions,
      {
        number: 2,
        content: '질문2',
        isRequired: true,
        linkedSector: null,
        choices: null,
      },
    ];
  }

  // eslint-disable-next-line no-restricted-syntax, @typescript-eslint/no-empty-function
  initializeLongAnswer() {}
}
