import { immerable } from 'immer';

export class Question implements QuestionType {
  [immerable] = true;

  number: number;
  content: string;
  isRequired = true;
  linkedSector: number | null = null;
  choices: ChoiceType[] | null = null;

  constructor(idx: number) {
    this.number = idx;
    this.content = '질문' + idx;
  }
}
