import { css } from '@emotion/react';
import { useState } from 'react';
import { useWorkspaces } from '@api';
import { Button, Input, Modal, SelectDropDown, SelectPackageDropDown } from '@components';
import { useInput } from '@hooks/useInput';
import { useQueryString } from '@hooks/useQueryString';
import { useSwitch } from '@hooks/useSwitch';
import { AlphaToHex, C, Colors, Fonts } from '@styles';
import { requireContentAndMaxNumber } from '@utils/errorCheckers';
import { parseSubmitDate } from '@utils/parseSubmitDate';

export const WorkspacesViewPage = () => {
  const id = useQueryString('id');
  const {
    _getWorkspaceById,
    _getRoutines,
    _postPackagesToWorkspace,
    _deletePackageFromWorkspace,
    _postRoutines,
    _deleteRoutines,
    _postRoutineDetails,
  } = useWorkspaces();
  const { data: workspace } = _getWorkspaceById(id);
  const { data: routines, remove: removeRoutines, refetch: refetchRoutines } = _getRoutines(id);

  const [isPackageModalOpened, onOpenPackageModal, onClosePackageModal] = useSwitch();
  const [isRoutineModalOpened, onOpenRoutineModal, onCloseRoutineModal] = useSwitch();
  const [isRoutineDetailsModalOpened, onOpenRoutineDetailsModal, onCloseRoutineDetailsModal] = useSwitch();
  const [packages, setPackages] = useState<number[]>([]);
  const [duration, onChangeDuration] = useInput();
  const [kickOff, onChangeKickedOff] = useState<number>();
  const [nthDay, onChangeNthDay] = useInput();
  const [time, onChangeTime] = useInput();
  const [surveyPackage, , , onManuallyChangeSurveyPackage] = useInput();

  const requestPostPackagesToWorkspace = async () => {
    if (id === undefined) return;
    await _postPackagesToWorkspace.mutateAsync([+id, { surveyPackages: packages }]);
    onClosePackageModal();
  };

  const requestDeletePackageFromWorkspace = async (packageId: number) => {
    if (id === undefined) return;
    await _deletePackageFromWorkspace.mutateAsync([+id, packageId]);
  };

  const requestPostRoutines = async () => {
    if (id === undefined) return;
    await _postRoutines.mutateAsync([
      +id,
      {
        duration: +duration,
        kickOff: kickOff || 0,
        routines: [],
      },
    ]);
    onCloseRoutineModal();
    removeRoutines();
    refetchRoutines();
  };

  const requestPostRoutineDetails = async () => {
    if (!routines?.id) return;
    await _postRoutineDetails.mutateAsync([
      routines.id,
      {
        nthDay: +nthDay,
        time: time,
        surveyPackage: +surveyPackage,
      },
    ]);
    onCloseRoutineDetailsModal();
  };

  const onAddPackage = (packageId: number) => {
    if (packages.includes(packageId)) return;
    setPackages([...packages, packageId]);
  };

  const onRemovePackage = (packageId: number) => {
    if (!packages.includes(packageId)) return;
    setPackages(packages.filter((_package) => _package !== packageId));
  };

  return (
    <div css={Container}>
      <div css={C.Meta}>
        <h1>{workspace?.name}&nbsp;</h1>
        <h2>
          {workspace?.owner.name}
          <br />
          {workspace?.owner.email}
          <br />
          {workspace?.accessCode}
        </h2>
        <p>created. {parseSubmitDate(workspace?.createdAt ?? '')}</p>
        <div css={Buttons}>
          <Button label='기본 정보 수정' onClick={() => alert('기본 정보 수정')} />
        </div>
      </div>
      <div css={OuterBox}>
        <div>
          <h1>Packages</h1>
          <Button
            label='패키지 +'
            onClick={onOpenPackageModal}
            backgroundColor={`${Colors.highlight}${AlphaToHex['0.5']}`}
          />
        </div>
        <div css={InnerBox}>
          {workspace?.surveyPackages.length ? (
            <div css={Tags}>
              {workspace.surveyPackages.map((_package, i) => (
                <div css={Tag} onClick={() => requestDeletePackageFromWorkspace(_package.id)} key={i}>
                  <div>{_package.id}</div>
                  <div>{_package.title}</div>
                </div>
              ))}
            </div>
          ) : (
            <div css={Empty}>추가된 패키지 없음</div>
          )}
        </div>
      </div>
      <div css={OuterBox}>
        <div>
          <h1>Routines</h1>
          <Button
            label={routines ? '루틴 +' : '루틴 생성'}
            onClick={routines ? onOpenRoutineDetailsModal : onOpenRoutineModal}
            backgroundColor={routines ? `${Colors.highlight}${AlphaToHex['0.5']}` : 'lightblue'}
          />
        </div>
        <div css={InnerBox}>
          {!routines && <div css={Empty}>생성된 루틴 없음</div>}
          {routines && (
            <div css={RoutineMeta}>
              <h2>
                <span>Duration</span> {routines.duration}
              </h2>
              <h2>
                <span>KickOff</span> {routines.kickOff}
              </h2>
            </div>
          )}
          {!!routines?.routines.length && (
            <div css={RoutineDetails}>
              <h2>NthDay</h2>
              <h2>Time</h2>
              <h2>Package</h2>
              <h2>삭제</h2>
              {routines.routines.map((routine, i) => (
                <RoutineDetail
                  id={routine.id}
                  nthDay={routine.nthDay}
                  time={routine.time}
                  surveyPackage={routine.surveyPackage}
                  key={i}
                />
              ))}
            </div>
          )}
        </div>
        {routines && (
          <div css={AlignToRight}>
            <Button
              label='루틴 삭제'
              onClick={() => _deleteRoutines.mutate([+(id ?? 0)])}
              backgroundColor='lightCoral'
            />
          </div>
        )}
      </div>
      <Modal
        title='패키지 추가'
        onCancel={onClosePackageModal}
        onSubmit={requestPostPackagesToWorkspace}
        isHidden={!isPackageModalOpened}>
        {!!packages.length && (
          <div css={Tags}>
            {packages.map((_package, i) => (
              <div css={Tag} onClick={() => onRemovePackage(_package)} key={i}>
                <div>{_package}</div>
              </div>
            ))}
          </div>
        )}
        <SelectPackageDropDown onSelect={(packageId) => onAddPackage(packageId)} />
      </Modal>
      <Modal
        title='루틴 생성'
        onCancel={onCloseRoutineModal}
        onSubmit={requestPostRoutines}
        isHidden={!isRoutineModalOpened}>
        <Input value={duration} onChange={onChangeDuration} placeholder='킥오프 서베이 이후부터의 루틴 날짜 수' />
        <SelectDropDown
          onSelect={(id) => onChangeKickedOff(id)}
          label={kickOff ?? '킥오프 서베이를 선택하세요.'}
          disabled={false}
          data={workspace?.surveyPackages.map((_package) => ({ id: _package.id, title: _package.title })) || []}
          forwardCss={css`
            width: 100%;
          `}
        />
      </Modal>
      <Modal
        title='루틴 +'
        onCancel={onCloseRoutineDetailsModal}
        onSubmit={requestPostRoutineDetails}
        isHidden={!isRoutineDetailsModalOpened}>
        <Input
          value={nthDay + ''}
          onChange={onChangeNthDay}
          placeholder={`n번째 날 (0~${routines?.duration})`}
          errorChecker={() => requireContentAndMaxNumber(nthDay, +(routines?.duration ?? 0))}
        />
        <Input value={time + ''} onChange={onChangeTime} placeholder='HH:MM' />
        <SelectDropDown
          onSelect={(id) => onManuallyChangeSurveyPackage(id + '')}
          label={surveyPackage || '패키지를 선택하세요.'}
          disabled={false}
          data={workspace?.surveyPackages.map((_package) => ({ id: _package.id, title: _package.title })) || []}
          forwardCss={css`
            width: 100%;
          `}
        />
      </Modal>
    </div>
  );
};

const RoutineDetail = ({ id, nthDay, time, surveyPackage }: RoutineDetailProps) => {
  const { _deleteRoutineDetails } = useWorkspaces();
  return (
    <>
      <div>{nthDay}번째 날</div>
      <div>{time}</div>
      <div>{surveyPackage}</div>
      <Button label='삭제' onClick={() => _deleteRoutineDetails.mutate([id])} backgroundColor='lightCoral' />
    </>
  );
};

const Container = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const OuterBox = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 50rem;

  > div:first-of-type {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > h1 {
      ${Fonts.bold20}
    }
  }
`;

const InnerBox = css`
  border: 0.1rem solid lightgray;
  padding: 1rem 1.2rem;
  border-radius: 0.8rem;
  text-align: center;
`;

const Empty = css`
  color: #cdcdcd;
  margin: 3rem auto;
`;

const Buttons = css`
  display: flex;
  gap: 1rem;
`;

const Tags = css`
  display: flex;
  gap: 0.5rem;
`;

const Tag = css`
  ${Fonts.medium14}
  border-radius: 0.3rem;
  background-color: ${Colors.highlight}${AlphaToHex['0.5']};
  width: fit-content;
  cursor: pointer;
  display: flex;
  overflow: hidden;

  :hover {
    > div {
      background-color: lightcoral;
      color: white;
    }
  }

  > div {
    padding: 0.5rem 0.8rem;
    transition: 0.3s ease;
  }

  > div:first-of-type {
    background-color: ${Colors.highlight};
  }
`;

const RoutineMeta = css`
  display: flex;
  flex-direction: column;
  width: 100%;

  > h2 {
    line-height: 140%;
    text-align: left;

    > span {
      ${Fonts.medium14}
      color: ${Colors.highlight};
    }
  }
`;

const RoutineDetails = css`
  ${Fonts.medium18}
  margin-top: 1rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  text-align: center;
  row-gap: 1rem;

  > h2 {
    ${Fonts.medium14}
    color: ${Colors.highlight};
  }

  > button {
    margin: 0 auto;
  }
`;

const AlignToRight = css`
  margin-left: auto;
`;
