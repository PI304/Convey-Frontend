type SurveyType = {
  title: string;
  description: string;
  questionType: string;
  commonChoices: ChoiceType[] | null;
  questions: QuestionType[];
};

type ChoiceType = {
  number: number;
  content: string;
  isDescriptive: boolean;
  descForm: string | null;
};

type QuestionType = {
  number: number;
  content: string;
  isRequired: boolean;
  linkedSector: number | null;
  choices: ChoiceType[] | null;
};
