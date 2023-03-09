import { immerable } from 'immer';
import { QuestionTypes } from '../constants/questionTypes';

export class Choice implements ChoiceType {
  [immerable] = true;

  number: number;
  content: string | null;
  isDescriptive = false;
  descForm: string | null = null;

  constructor(idx: number, questionType: ValueOf<typeof QuestionTypes>, isCommonChoice: boolean) {
    this.number = idx;

    switch (isCommonChoice) {
      case true:
        this.content = '기준' + idx;
        break;
      case false:
        this.content = '선택' + idx;
    }

    switch (questionType) {
      case QuestionTypes.shortAnswer:
        this.initializeDescriptiveChoice();
    }
  }

  initializeDescriptiveChoice() {
    this.isDescriptive = true;
    this.content = null;
  }

  setFromServerData(choice: ResponseChoiceType) {
    this.number = choice.number;
    this.content = choice.content;
    this.isDescriptive = choice.isDescriptive;
    this.descForm = choice.descForm;
  }
}
