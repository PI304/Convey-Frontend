type BoolType<T extends string> = {
  [key in T]: boolean;
};

type StrType<T extends string> = {
  [key in T]: string;
};

type ValueOf<T> = T[keyof T];
