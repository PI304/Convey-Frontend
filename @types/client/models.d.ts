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

type ResponseSurveyType = Omit<SurveyType, 'commonChoices' | 'questions'> & {
  id: number;
  survey: number;
  commonChoices: ResponseChoiceType[] | null;
  questions: ResponseQuestionType[];
};

type ResponseQuestionType = Omit<QuestionType, 'choices'> & {
  id: number;
  sector: number;
  createdAt: string;
  updatedAt: string;
  choices: ResponseChoiceType[] | null;
};

type ResponseChoiceType = ChoiceType & {
  id: number;
  createdAt: string;
  updatedAt: string;
  relatedSector: number;
  relatedQuestion: number;
};
