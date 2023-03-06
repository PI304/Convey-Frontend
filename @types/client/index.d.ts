import { SerializedStyles } from '@emotion/utils/types';
import { QuestionTypes } from '@constants';

type LayoutProps = ChildrenType & {
  forwardCss?: SerializedStyles;
};

type AddQuestionAtomType = {
  surveyIdx: number;
  questionType: ValueOf<typeof QuestionTypes>;
};

type AddChoiceAtomType = {
  surveyIdx: number;
  questionIdx: number;
  questionType: ValueOf<typeof QuestionTypes>;
};

type AddCommonChoiceAtomType = {
  surveyIdx: number;
  questionType: ValueOf<typeof QuestionTypes>;
};
