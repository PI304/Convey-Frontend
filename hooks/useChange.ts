import { useState } from 'react';

export const useChange = <T>(initialValue: T): [T, (value: T) => void] => {
  const [value, setValue] = useState(initialValue);
  const onChangeValue = (value: T) => setValue(value);
  return [value, onChangeValue];
};
