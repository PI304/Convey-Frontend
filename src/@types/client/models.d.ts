type SurveyType = {
  instruction: string;
  description: string;
  isLinked: boolean;
  questionType: string;
  commonChoices: ChoiceType[] | null;
  questions: QuestionType[];
};

type QuestionType = {
  number: string;
  content: string;
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

type ResponseAuthorType = {
  id: number;
  email: string;
  name: string;
  socialProvider: string;
  role: number;
  password: string;
  createdAt: string;
  updatedAt: string;
};

type ResponseContactType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  type: string;
  content: string;
  surveyPackage: number;
};

type IncludedSurveyType = {
  number: number;
  title: string;
  survey: number;
};
