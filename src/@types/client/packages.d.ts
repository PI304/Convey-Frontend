type PackageBoxProps = {
  _package: ResponsePackages.GetById;
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
