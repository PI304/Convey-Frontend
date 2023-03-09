export const QuestionTypes = {
  likert: 'likert',
  shortAnswer: 'short_answer',
  singleSelect: 'single_select',
  multiSelect: 'multi_select',
  extent: 'extent',
  longAnswer: 'long_answer',
} as const;

export const QuestionTypeLables = {
  likert: '리커트척도',
  short_answer: '단답형',
  single_select: '단일선택',
  multi_select: '복수선택',
  extent: '정도',
  long_answer: '장문형',
} as const;

export const QuestionTypeCategories = {
  needCommonChoice: [QuestionTypes.likert, QuestionTypes.extent],
} as const;
