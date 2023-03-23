import { css } from '@emotion/react';
import { useAuth } from '@api';
import { Button } from '@components';
import { useInput } from '@hooks/useInput';

export const LoginPage = () => {
  const { _postLogin } = useAuth();

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  return (
    <div css={Container}>
      <h1>LoginPage</h1>
      <input value={email} onChange={onChangeEmail} placeholder='ID' />
      <input value={password} onChange={onChangePassword} placeholder='비밀번호' />
      <Button label='로그인' onClick={() => _postLogin.mutate([{ email, password }])} />
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
