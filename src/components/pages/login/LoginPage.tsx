import { css } from '@emotion/react';
import { useSetAtom } from 'jotai';
import { useMutation } from 'react-query';
import { postLogin } from '@api';
import { authAtom } from '@atoms';
import { Button } from '@components';
import { StorageKeys } from '@constants';
import { useInput } from '@hooks/useInput';

export const LoginPage = () => {
  const setAuth = useSetAtom(authAtom);
  const [email, onChangeEmail] = useInput('example@email.com');
  const [password, onChangePassword] = useInput('12345678');
  const { mutate } = useMutation(() => postLogin({ email, password }), {
    onSuccess: (data) => {
      setAuth({ accessToken: data.accessToken });
      sessionStorage.setItem(StorageKeys.accessToken, data.accessToken);
    },
  });

  return (
    <div css={Container}>
      <h1>LoginPage</h1>
      <input value={email} onChange={onChangeEmail} placeholder='ID' />
      <input value={password} onChange={onChangePassword} placeholder='비밀번호' />
      <Button label='로그인' onClick={mutate} />
    </div>
  );
};

const Container = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > input {
    width: fit-content;
  }
`;
