import { css } from '@emotion/react';
import { postSurveys } from '@api';
import { Button } from '@components';
import { Paths } from '@constants';
import { useInput } from '@hooks/useInput';
import { useRouteToPath } from '@hooks/useRouteToPath';

export const SurveysNewPage = () => {
  const [title, onChangeTitle] = useInput();
  const [description, onChangeDescription] = useInput();
  const [abbr, onChangeAbbr] = useInput();
  const onRouteToBoard = useRouteToPath(Paths.surveys);

  const onSubmit = async () => {
    await postSurveys({ title, description, abbr });
    onRouteToBoard();
  };

  return (
    <div css={Container}>
      <h1>Surveys New</h1>
      <input value={title} onChange={onChangeTitle} placeholder='제목' />
      <input value={description} onChange={onChangeDescription} placeholder='설명' />
      <input value={abbr} onChange={onChangeAbbr} placeholder='약어' />
      <Button label='제출' onClick={onSubmit} />
    </div>
  );
};

const Container = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > input {
    display: block;
    padding: 0.5rem 0.8rem;
  }
`;
