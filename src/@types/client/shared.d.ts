type CommonButtonProps = {
  label: string;
  onClick: () => void;
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
};

type ModalProps = ChildrenType & {
  title: string;
  onCancel: () => void;
  onSubmit: () => void;
  isHidden: boolean;
};
