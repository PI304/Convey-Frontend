/* eslint-disable react-hooks/exhaustive-deps */
import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useSurveys } from '@api';
import { AutoResizeTextArea, Board, Button, Input, Modal } from '@components';
import { Paths } from '@constants';
import { useInput } from '@hooks/useInput';
import { useSwitch } from '@hooks/useSwitch';
import { AlphaToHex, Colors } from '@styles';
import { parseSubmitDate } from '@utils/parseSubmitDate';

export const SurveysPage = () => {
  const { _getSurveys, _postSurveys, _deleteSurveys } = useSurveys();

  const [title, onChangeTitle, onResetTitle] = useInput();
  const [description, onChangeDescription, onResetDescription] = useInput();
  const [abbr, onChangeAbbr, onResetAbbr] = useInput();
  const [isModalOpened, onOpenModal, onCloseModal] = useSwitch();

  const requestPostSurveys = async () => {
    await _postSurveys.mutateAsync([{ title, description, abbr }]);
    onCloseModal();
  };

  useEffect(() => {
    if (!isModalOpened) return;
    onResetTitle();
    onResetDescription();
    onResetAbbr();
  }, [isModalOpened]);

  return (
    <div css={Container}>
      <Button
        label='새로운 소주제 +'
        onClick={onOpenModal}
        backgroundColor={`${Colors.highlight}${AlphaToHex['0.5']}`}
      />
      <Board
        heads={['ID', '제목', '약어', '작성자', '작성일']}
        bodies={
          (_getSurveys?.data?.length &&
            _getSurveys?.data?.map((survey) => [
              survey.id, //
              survey.title,
              survey.abbr,
              survey.author.name,
              parseSubmitDate(survey.createdAt),
            ])) ||
          []
        }
        viewPath={Paths.surveys}
        onDelete={_deleteSurveys.mutate}
      />
      <Modal title='새로운 소주제' onCancel={onCloseModal} onSubmit={requestPostSurveys} isHidden={!isModalOpened}>
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

  > button {
    border: 0.1rem solid black;
  }
`;
