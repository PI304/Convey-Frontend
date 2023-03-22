type CommonButtonProps = {
  label: string;
  onClick: (...args: any) => void;
  backgroundColor?: string;
  disabled?: boolean;
};

type BoardProps = {
  heads: string[];
  bodies: (string | number)[][];
  viewPath: string;
  onDelete: (args: any) => void;
};

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  width?: string;
  disabled?: boolean;
  isOptional?: boolean;
};

type ModalProps = ChildrenType & {
  title: string;
  onCancel: () => void;
  onSubmit: () => void;
  isHidden: boolean;
};

type SelectPackageDropDownProps = {
  label?: string;
  onSelect: (id: number) => void;
};

type SelectSurveyDropDownProps = {
  selectedSurveyId: number;
  onSelect: (id: number) => void;
  disabled: boolean;
};

type SelectDropDownProps<T extends { id: number; title?: string }[]> = {
  onSelect: (id: number) => void;
  label: string | number;
  disabled: boolean;
  data: T;
};

type AutoResizeTextAreaProps = InputProps & {
  rows?: number;
};

type ToggleButtonProps = {
  isActive: boolean;
  onToggle: () => void;
  labelForActive: string;
  labelForDeactive: string;
};
