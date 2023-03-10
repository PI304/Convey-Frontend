import { immerable } from 'immer';
import { QuestionTypes } from '@constants';
import { Choice } from '@models';

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

  setFromServerData(question: ResponseQuestionType, questionType: ValueOf<typeof QuestionTypes>) {
    this.number = question.number;
    this.content = question.content;
    this.isRequired = question.isRequired;
    this.linkedSector = question.linkedSector;
    const choices: ChoiceType[] = [];
    question.choices?.forEach((choice, idx) => {
      const newChoice = new Choice(idx, questionType, false);
      newChoice.setFromServerData(choice);
      choices.push(newChoice);
    });
    this.choices = choices.length ? choices : null;
  }
}
