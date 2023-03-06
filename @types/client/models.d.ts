type SurveyType = {
  title: string;
  description: string;
  questionType: string;
  commonChoices: ChoiceType[] | null;
  questions: QuestionType[];
};

type QuestionType = {
  number: number;
  content: string;
  isRequired: boolean;
  linkedSector: number | null;
  choices: ChoiceType[] | null;
};

type ChoiceType = {
  number: number;
  content: string | null;
  isDescriptive: boolean;
  descForm: string | null;
};
