import { css } from '@emotion/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Colors } from '../../../styles/colors';
import { getSurveysById, putSurveys } from '@api';
import { addSurveyAtom, resetSurveysAtom, setSurveysFromServerDataAtom, surveysAtom } from '@atoms';
import { Button, SurveyBox } from '@components';
import { QueryKeys, QuestionTypes } from '@constants';
import { useQueryString } from '@hooks/useQueryString';
import { AlphaToHex, Fonts } from '@styles';
import { parseSubmitDate } from '@utils/parseSubmitDate';

export const SurveysViewPage = () => {
  const id = useQueryString('id');
  const surveys = useAtomValue(surveysAtom);
  const addSurvey = useSetAtom(addSurveyAtom);
  const setSurveysFromServerData = useSetAtom(setSurveysFromServerDataAtom);
  const resetSurveys = useSetAtom(resetSurveysAtom);
  const { mutate } = useMutation(() => putSurveys(+(id || 0), surveys || []), {
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const { data } = useQuery(
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

  useEffect(() => {
    return () => resetSurveys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div css={Container}>
      <div css={Meta}>
        <h1>
          {data?.title}&nbsp;
          <span>{data?.abbr}</span>
        </h1>
        <h2>{data?.description}</h2>
        <p>{parseSubmitDate(data?.createdAt ?? '')}</p>
        <Button label='저장하기' onClick={mutate} backgroundColor={`${Colors.highlight}${AlphaToHex['0.6']}`} />
      </div>
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

const Meta = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-bottom: 0.1rem solid lightgray;
  padding-bottom: 1.5rem;

  > h1 {
    ${Fonts.semiBold32}

    > span {
      ${Fonts.medium16}
    }
  }

  > p {
    ${Fonts.light14}
  }
`;

const AddSurveyButtons = css`
  display: flex;
  gap: 1rem;
`;
