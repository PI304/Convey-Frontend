import produce from 'immer';
import { useState } from 'react';

export const useInputs = <T>(
  initialState: T,
): [T, (e: React.ChangeEvent<HTMLInputElement>, key: keyof T) => void, (data: T) => void] => {
  const [data, setData] = useState<T>(initialState);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, key: keyof T) => {
    const newData = produce(data, (draft: any) => {
      if (draft) draft[key] = e.target.value;
    });
    setData(newData);
  };

  const onSetData = (data: T) => {
    setData(data);
  };

  return [data, onChange, onSetData];
};
