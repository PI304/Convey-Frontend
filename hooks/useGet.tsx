import { Dispatch, SetStateAction } from 'react';

export const useGet = async <T,>(
  api: () => Promise<T>,
  dispatch: Dispatch<SetStateAction<T | undefined>>,
) => {
  const res = await api();
  dispatch(res);
};
