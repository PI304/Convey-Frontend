import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getSurveys } from '@api';
import { Board, Button } from '@components';
import { Paths } from '@constants';
import { useChange } from '@hooks/useChange';
import { useRouteToPath } from '@hooks/useRouteToPath';
import { fetchAndSet } from '@utils';

export const SurveysPage = () => {
  const onRouteToNew = useRouteToPath(Paths.surveysNew);
  const [page, onChangePage] = useChange(1);
  const [surveys, setSurveys] = useState<ResponseSurveys.Get>();

  useEffect(() => {
    fetchAndSet(() => getSurveys(page), setSurveys);
  }, [page]);

  return (
    <div css={Container}>
      <h1>Surveys</h1>
      <Button label='새로운 소주제' onClick={onRouteToNew} />
      <Board
        heads={['ID', '제목', 'ABBR', '작성자', '작성일']}
        bodies={
          (surveys?.length &&
            surveys.map((survey) => [
              survey.id, //
              survey.title,
              survey.abbr,
              survey.author.name,
              survey.createdAt,
            ])) ||
          []
        }
        viewPath={Paths.surveys}
      />
    </div>
  );
};

const Container = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  > button {
    margin: 1rem;
    border: 0.1rem solid black;
  }
`;
