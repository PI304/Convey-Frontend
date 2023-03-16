/* eslint-disable react-hooks/exhaustive-deps */
import { css } from '@emotion/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { getSurveysById, putSurveys, patchSurveys } from '@api';
import { addSurveyAtom, resetSurveysAtom, setSurveysFromServerDataAtom, surveysAtom } from '@atoms';
import { AutoResizeTextArea, Button, Input, Modal, SurveyBox } from '@components';
import { QueryKeys, QuestionTypes } from '@constants';
import { useInput } from '@hooks/useInput';
import { useQueryString } from '@hooks/useQueryString';
import { useSwitch } from '@hooks/useSwitch';
import { queryClient } from '@pages/_app';
import { AlphaToHex, C, Colors } from '@styles';
import { parseSubmitDate } from '@utils/parseSubmitDate';

export const SurveysViewPage = () => {
  const id = useQueryString('id');
  const [title, onChangeTitle, , onManuallySetTitle] = useInput();
  const [description, onChangeDescription, , onManuallySetDescription] = useInput();
  const [abbr, onChangeAbbr, , onManuallySetAbbr] = useInput();
  const [isModalOpened, onOpenModal, onCloseModal] = useSwitch();
  const surveys = useAtomValue(surveysAtom);
  const addSurvey = useSetAtom(addSurveyAtom);
  const setSurveysFromServerData = useSetAtom(setSurveysFromServerDataAtom);
  const resetSurveys = useSetAtom(resetSurveysAtom);
  const { mutate: put } = useMutation(() => putSurveys(+(id || 0), surveys || []));
  const { mutate: patch } = useMutation(() => patchSurveys(+(id || 0), { title, description, abbr }), {
    onSuccess: () => {
      onCloseModal();
      queryClient.invalidateQueries([QueryKeys.surveysById]);
    },
  });
  const { data } = useQuery(
    [QueryKeys.surveysById, id],
    () => {
      if (id) return getSurveysById(+(id || 0));
      // if (id) return getMockSurveysById();
    },
    {
      onSuccess: (data) => {
        if (data) setSurveysFromServerData({ surveys: data.sectors });
      },
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    if (!data) return;
    if (!isModalOpened) return;
    onManuallySetTitle(data.title);
    onManuallySetDescription(data.description);
    onManuallySetAbbr(data.abbr);
  }, [isModalOpened, data]);

  useEffect(() => {
    return () => resetSurveys();
  }, []);

  return (
    <div css={Container}>
      <div css={C.Meta}>
        <h1>
          {data?.title}&nbsp;
          <span>{data?.abbr}</span>
        </h1>
        <h2>{data?.description}</h2>
        <p>created. {parseSubmitDate(data?.createdAt ?? '')}</p>
        <div css={Buttons}>
          <Button label='기본 정보 수정' onClick={onOpenModal} />
          <Button label='서베이 구성 저장' onClick={put} backgroundColor={`${Colors.highlight}${AlphaToHex['0.6']}`} />
        </div>
      </div>
      {surveys?.map((survey, i) => (
        <SurveyBox survey={survey} surveyIdx={i} key={i} />
      ))}
      <div css={Buttons}>
        <Button label='리커트추가' onClick={() => addSurvey({ questionType: QuestionTypes.likert })} />
        <Button label='정도추가' onClick={() => addSurvey({ questionType: QuestionTypes.extent })} />
        <Button label='단일선택추가' onClick={() => addSurvey({ questionType: QuestionTypes.singleSelect })} />
        <Button label='복수선택추가' onClick={() => addSurvey({ questionType: QuestionTypes.multiSelect })} />
        <Button label='단답형추가' onClick={() => addSurvey({ questionType: QuestionTypes.shortAnswer })} />
        <Button label='장문형추가' onClick={() => addSurvey({ questionType: QuestionTypes.longAnswer })} />
      </div>
      <Modal title='기본 정보 수정' onCancel={onCloseModal} onSubmit={patch} isHidden={!isModalOpened}>
        <Input value={title} onChange={onChangeTitle} placeholder='제목' />
        <AutoResizeTextArea value={description} onChange={onChangeDescription} placeholder='설명' />
        <Input value={abbr} onChange={onChangeAbbr} placeholder='약어' />
      </Modal>
    </div>
  );
};

const Container = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Buttons = css`
  display: flex;
  gap: 1rem;
`;
