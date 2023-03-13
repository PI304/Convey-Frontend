type CommonButtonProps = {
  label: string;
  onClick: (...args: any) => void;
  backgroundColor?: string;
};

type BoardProps = {
  heads: string[];
  bodies: (string | number)[][];
  viewPath: string;
};

type SurveyBoxProps = {
  surveyIdx: number;
  survey: SurveyType;
};

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  width?: string;
  disabled?: boolean;
};

type ModalProps = ChildrenType & {
  title: string;
  onCancel: () => void;
  onSubmit: () => void;
  isHidden: boolean;
};

type PackageBoxProps = {
  _package: ResponsePackages.Package;
};

type PartsBoxProps = {
  packageId: number;
};

type PartBoxProps = {
  part: ResponseParts.Part;
};

type SubjectsBoxProps = {
  partId: number;
};

type SubjectBoxProps = {
  subject: ResponseSubjects.Subject;
};

type IncludedSurveysBoxProps = {
  isEditMode: boolean;
  subjectId: number;
  onInitIncludedSurveys: (surveys: IncludedSurveyType[]) => void;
  includedSurveys: IncludedSurveyType[];
  onChangeNumber: (surveyIdx: number, number: number) => void;
  onChangeTitle: (surveyIdx: number, title: string) => void;
  onChangeSurvey: (surveyIdx: number, survey: number) => void;
  onRemoveSurvey: (surveyIdx: number) => void;
};

type SelectSurveyDropDownProps = {
  selectedSurvey: number;
  onSelect: (surveyId: number) => void;
  disabled: boolean;
};

type AutoResizeTextAreaProps = InputProps & {
  rows?: number;
};
