/* eslint-disable react-hooks/exhaustive-deps */
import { css } from '@emotion/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { useSurveys } from '@api';
import { addSurveyAtom, resetSurveysAtom, surveysAtom } from '@atoms';
import { AutoResizeTextArea, Button, Input, Modal, SurveyBox } from '@components';
import { QuestionTypes } from '@constants';
import { useInput } from '@hooks/useInput';
import { useQueryString } from '@hooks/useQueryString';
import { useSwitch } from '@hooks/useSwitch';
import { AlphaToHex, C, Colors } from '@styles';
import { parseSubmitDate } from '@utils/parseSubmitDate';

export const SurveysViewPage = () => {
  const id = useQueryString('id');
  const surveys = useAtomValue(surveysAtom);
  const addSurvey = useSetAtom(addSurveyAtom);
  const resetSurveys = useSetAtom(resetSurveysAtom);
  const { _getSurveysById, _patchSurveys, _putSurveys } = useSurveys();
  const { data: serverSurveys } = _getSurveysById(id);
  const [title, onChangeTitle, , onManuallySetTitle] = useInput();
  const [description, onChangeDescription, , onManuallySetDescription] = useInput();
  const [abbr, onChangeAbbr, , onManuallySetAbbr] = useInput();
  const [isModalOpened, onOpenModal, onCloseModal] = useSwitch();

  const requestPatchSurveys = async () => {
    if (!id) return;
    await _patchSurveys.mutateAsync([+id, { title, description, abbr }]);
    onCloseModal();
  };

  const requestPutSurveys = () => {
    if (!id || !surveys) return;
    _putSurveys.mutate([+id, surveys]);
  };

  useEffect(() => {
    if (!serverSurveys) return;
    if (!isModalOpened) return;
    onManuallySetTitle(serverSurveys.title);
    onManuallySetDescription(serverSurveys.description);
    onManuallySetAbbr(serverSurveys.abbr);
  }, [isModalOpened, serverSurveys]);

  useEffect(() => {
    return () => resetSurveys();
  }, []);

  return (
    <div css={Container}>
      <div css={C.Meta}>
        <h1>
          {serverSurveys?.title}&nbsp;
          <span>{serverSurveys?.abbr}</span>
        </h1>
        <h2>{serverSurveys?.description}</h2>
        <p>created. {parseSubmitDate(serverSurveys?.createdAt ?? '')}</p>
        <div css={Buttons}>
          <Button label='기본 정보 수정' onClick={onOpenModal} />
          <Button
            label='서베이 구성 저장'
            onClick={requestPutSurveys}
            backgroundColor={`${Colors.highlight}${AlphaToHex['0.6']}`}
          />
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
      <Modal title='기본 정보 수정' onCancel={onCloseModal} onSubmit={requestPatchSurveys} isHidden={!isModalOpened}>
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
