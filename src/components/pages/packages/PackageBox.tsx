import { css } from '@emotion/react';
import produce from 'immer';
import { useState, useEffect } from 'react';
import { usePackages } from '@api';
import { Button, Input, Modal, SelectSurveyDropDown } from '@components';
import { QueryKeys } from '@constants';
import { useInputs } from '@hooks/useInputs';
import { useSwitch } from '@hooks/useSwitch';
import { IncludedSurvey } from '@models';
import { queryClient } from '@pages/_app';
import { svgChevronDown, svgChevronRight } from '@styles';
import { withoutPropagation } from '@utils/withoutPropagation';

export const PackageBox = ({ _package }: PackageBoxProps) => {
  return (
    <div css={Container}>
      <PartsBox packageId={_package.id} />
    </div>
  );
};

const PartsBox = ({ packageId }: PartsBoxProps) => {
  const { _getParts } = usePackages();
  return (
    <>
      {_getParts(packageId).data?.results.map((part, i) => (
        <PartBox part={part} key={i} />
      ))}
    </>
  );
};

const PartBox = ({ part }: PartBoxProps) => {
  const { _deletePart, _postSubject } = usePackages();

  const [isModalOpened, onOpenModal, onCloseModal] = useSwitch();
  const [isSubjectsOpened, onOpenSubjects, , onToggleSubjects] = useSwitch();
  const [data, onChangeData] = useInputs<RequestSubjects.Post>({
    number: 0,
    title: '',
  });

  const requestPostSubject = async () => {
    await _postSubject.mutateAsync([part.id, data]);
    onCloseModal();
    onOpenSubjects();
  };

  return (
    <div css={Container} onClick={(e) => withoutPropagation(e, onToggleSubjects)}>
      <div css={[Common, Part, Pointer]}>
        <div css={Title}>
          {isSubjectsOpened ? svgChevronDown : svgChevronRight}
          {part.title}
        </div>
        <div css={Buttons}>
          <Button label='대주제 +' onClick={(e) => withoutPropagation(e, onOpenModal)} />
          <Button
            label='삭제'
            onClick={(e) => withoutPropagation(e, () => _deletePart.mutate([part.id]))}
            backgroundColor='lightcoral'
          />
        </div>
      </div>
      <Modal title='새로운 대주제' onCancel={onCloseModal} onSubmit={requestPostSubject} isHidden={!isModalOpened}>
        <Input value={data.number + ''} onChange={(e) => onChangeData(e, 'number')} placeholder='번호' />
        <Input value={data.title} onChange={(e) => onChangeData(e, 'title')} placeholder='제목' />
      </Modal>
      {isSubjectsOpened && <SubjectsBox partId={part.id} />}
    </div>
  );
};

const SubjectsBox = ({ partId }: SubjectsBoxProps) => {
  const { _getSubjects } = usePackages();
  return (
    <>
      {_getSubjects(partId).data?.results.map((subject, i) => (
        <SubjectBox subject={subject} key={i} />
      ))}
    </>
  );
};

const SubjectBox = ({ subject }: SubjectBoxProps) => {
  const { _putIncludedSurveys, _getIncludedSurveys, _deleteSubject } = usePackages();
  const { data: serverIncludedSurveys } = _getIncludedSurveys(subject.id);

  const [isEditMode, onStartEditMode, , onFinishEditMode] = useSwitch();
  const [includedSurveys, setIncludedSurveys] = useState<IncludedSurveyType[]>([]);

  const addSurvey = () => setIncludedSurveys([...includedSurveys, new IncludedSurvey(1, 1)]);

  const removeSurvey = (surveyIdx: number) => {
    const newSurveys = produce(includedSurveys, (draft) => {
      draft.splice(surveyIdx, 1);
    });
    setIncludedSurveys(newSurveys);
  };

  const changeNumber = (surveyIdx: number, number: number) => {
    const newSurveys = produce(includedSurveys, (draft) => {
      draft[surveyIdx].number = number;
    });
    setIncludedSurveys(newSurveys);
  };

  const changeTitle = (surveyIdx: number, title: string) => {
    const newSurveys = produce(includedSurveys, (draft) => {
      draft[surveyIdx].title = title;
    });
    setIncludedSurveys(newSurveys);
  };

  const changeSurvey = (surveyIdx: number, survey: number) => {
    const newSurveys = produce(includedSurveys, (draft) => {
      draft[surveyIdx].survey = survey;
    });
    setIncludedSurveys(newSurveys);
  };

  const initIncludedSurveys = (surveys: IncludedSurveyType[]) => setIncludedSurveys(surveys);

  const requestCancelEditMode = () => {
    setSurveysFromServerData();
    onFinishEditMode();
    queryClient.invalidateQueries([QueryKeys.includedSurveys]);
  };

  const requestPutIncludedSurveys = () => {
    onFinishEditMode();
    _putIncludedSurveys.mutate([subject.id, includedSurveys]);
  };

  const setSurveysFromServerData = () => {
    if (!serverIncludedSurveys) return;
    const newSurveys: IncludedSurvey[] = [];
    serverIncludedSurveys.surveys.forEach((survey) => {
      const newSurvey = new IncludedSurvey(0, 0);
      const number = survey.number;
      const title = survey.title;
      const surveyId = survey.survey.id;
      newSurvey.setFromServerData(number, title, surveyId);
      newSurveys.push(newSurvey);
    });
    initIncludedSurveys(newSurveys);
  };

  useEffect(() => {
    setSurveysFromServerData();
  }, [serverIncludedSurveys]);

  return (
    <div css={Container}>
      <div css={[Common, Subject]} onClick={withoutPropagation}>
        ({subject.number})&ensp;{subject.title}
        <div css={Buttons}>
          {isEditMode ? (
            <>
              <Button label='소주제 +' onClick={addSurvey} />
              <Button label='소주제 구성 저장' onClick={requestPutIncludedSurveys} />
              <Button label='취소' onClick={requestCancelEditMode} />
            </>
          ) : (
            <>
              <Button label='소주제 구성 수정' onClick={onStartEditMode} />
              <Button label='삭제' onClick={() => _deleteSubject.mutate([subject.id])} backgroundColor='lightcoral' />
            </>
          )}
        </div>
      </div>
      <IncludedSurveysBox
        isEditMode={isEditMode}
        subjectId={subject.id}
        onInitIncludedSurveys={initIncludedSurveys}
        includedSurveys={includedSurveys}
        onChangeNumber={changeNumber}
        onChangeTitle={changeTitle}
        onChangeSurvey={changeSurvey}
        onRemoveSurvey={removeSurvey}
      />
    </div>
  );
};

const IncludedSurveysBox = ({
  isEditMode,
  includedSurveys,
  onChangeNumber,
  onChangeTitle,
  onChangeSurvey,
  onRemoveSurvey,
}: IncludedSurveysBoxProps) => {
  return (
    <div css={Container} onClick={withoutPropagation}>
      {includedSurveys.map((includedSurvey, i) => (
        <div css={[Common, _IncludedSurvey]} key={i}>
          <Input
            value={includedSurvey.number + ''}
            onChange={(e) => onChangeNumber(i, +e.target.value)}
            placeholder='번호'
            disabled={!isEditMode}
          />
          <Input
            value={includedSurvey.title}
            onChange={(e) => onChangeTitle(i, e.target.value)}
            placeholder='제목'
            disabled={!isEditMode}
          />
          <SelectSurveyDropDown
            selectedSurveyId={includedSurvey.survey}
            onSelect={(surveyId: number) => onChangeSurvey(i, surveyId)}
            disabled={!isEditMode}
          />
          {isEditMode && (
            <div css={Buttons}>
              <Button label='삭제' onClick={() => onRemoveSurvey(i)} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Container = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Buttons = css`
  display: flex;
  gap: 1rem;
  margin-left: auto;
`;

const Common = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.2rem;
  border-radius: 0.8rem;
  margin-left: auto;
`;

const Part = css`
  background-color: pink;
  width: 95rem;
`;

const Subject = css`
  background-color: lightblue;
  width: 90rem;
`;

const _IncludedSurvey = css`
  background-color: #c2f09c;
  width: 85rem;
  justify-content: flex-start;
  gap: 1rem;
`;

const Pointer = css`
  cursor: pointer;
`;
