type CommonButtonProps = {
  label: string;
  onClick: () => void;
};

type BoardProps = {
  heads: string[];
  bodies: (string | number)[][];
  viewPath: string;
};
