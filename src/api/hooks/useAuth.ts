import { useSetAtom } from 'jotai';
import { useMutation } from 'react-query';
import { postLogin } from '@api';
import { authAtom } from '@atoms';
import { StorageKeys } from '@constants';

export const useAuth = () => {
  const setAuth = useSetAtom(authAtom);

  const _postLogin = useMutation((data: RequestAuth.PostLogin) => postLogin(data), {
    onSuccess: (data) => {
      setAuth({ accessToken: data.accessToken });
      sessionStorage.setItem(StorageKeys.accessToken, data.accessToken);
    },
  });

  return { _postLogin };
};
