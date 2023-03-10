import { css } from '@emotion/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useMutation, useQuery } from 'react-query';
import { getSurveysById, putSurveys } from '@api';
import { addSurveyAtom, setSurveysFromServerDataAtom, surveysAtom } from '@atoms';
import { Button, SurveyBox } from '@components';
import { QueryKeys, QuestionTypes } from '@constants';
import { useQueryString } from '@hooks/useQueryString';

export const SurveysViewPage = () => {
  const id = useQueryString('id');
  const surveys = useAtomValue(surveysAtom);
  const addSurvey = useSetAtom(addSurveyAtom);
  const setSurveysFromServerData = useSetAtom(setSurveysFromServerDataAtom);
  const { mutate } = useMutation(() => putSurveys(+(id || 0), surveys || []), {
    onSuccess: (data) => {
      console.log(data);
    },
  });
  useQuery(
    [QueryKeys.surveysById, id],
    () => {
      if (id) return getSurveysById(+(id || 0));
    },
    {
      onSuccess: (data) => {
        if (data) setSurveysFromServerData({ surveys: data.sectors });
      },
    },
  );

  return (
    <div css={Container}>
      <h1>SurveysViewPage / {id}</h1>
      <Button label='저장하기' onClick={mutate} />
      {surveys?.map((survey, i) => (
        <SurveyBox survey={survey} surveyIdx={i} key={i} />
      ))}
      <div css={AddSurveyButtons}>
        <Button label='리커트추가' onClick={() => addSurvey({ questionType: QuestionTypes.likert })} />
        <Button label='정도추가' onClick={() => addSurvey({ questionType: QuestionTypes.extent })} />
        <Button label='단일선택추가' onClick={() => addSurvey({ questionType: QuestionTypes.singleSelect })} />
        <Button label='복수선택추가' onClick={() => addSurvey({ questionType: QuestionTypes.multiSelect })} />
        <Button label='단답형추가' onClick={() => addSurvey({ questionType: QuestionTypes.shortAnswer })} />
        <Button label='장문형추가' onClick={() => addSurvey({ questionType: QuestionTypes.longAnswer })} />
      </div>
    </div>
  );
};

const Container = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const AddSurveyButtons = css`
  display: flex;
  gap: 1rem;
`;
