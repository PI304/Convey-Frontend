type RemoveSurveyAtomType = {
  surveyIdx: number;
};

type WriteSurveyInstructionAtomType = {
  surveyIdx: number;
  instruction: string;
};

type WriteSurveyDescriptionAtomType = {
  surveyIdx: number;
  description: string;
};

type WriteQuestionNumberAtomType = {
  surveyIdx: number;
  questionIdx: number;
  number: string;
};

type WriteQuestionContentAtomType = {
  surveyIdx: number;
  questionIdx: number;
  content: string;
};

type RemoveQuestionAtomType = {
  surveyIdx: number;
  questionIdx: number;
};

type WriteChoiceNumberAtomType = {
  surveyIdx: number;
  questionIdx: number;
  choiceIdx: number;
  number: number;
};

type WriteChoiceContentAtomType = {
  surveyIdx: number;
  questionIdx: number;
  choiceIdx: number;
  content: string;
};

type RemoveChoiceAtomType = {
  surveyIdx: number;
  questionIdx: number;
  choiceIdx: number;
};

type WriteCommonChoiceNumberAtomType = {
  surveyIdx: number;
  choiceIdx: number;
  number: number;
};

type WriteCommonChoiceContentAtomType = {
  surveyIdx: number;
  choiceIdx: number;
  content: string;
};

type RemoveCommonChoiceAtomType = {
  surveyIdx: number;
  choiceIdx: number;
};

type AddDescFormAtomType = {
  surveyIdx: number;
  questionIdx: number;
  choiceIdx: number;
};

type AddStaticDescFormAtomType = AddDescFormAtomType & {
  content: string;
};

type EraseDescFormType = {
  surveyIdx: number;
  questionIdx: number;
  choiceIdx: number;
};

type ToggleChoiceIsDescriptiveType = {
  surveyIdx: number;
  questionIdx: number;
  choiceIdx: number;
};

type SetFromServerDataType = {
  surveys: ResponseSurveyType[];
};

type ToggleSurveyIsLinkedType = {
  surveyIdx: number;
};

type AddFormErrorAtomType = {
  formId: string;
};

type RemoveFormErrorAtomType = {
  formId: string;
};
