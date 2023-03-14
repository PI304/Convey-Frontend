import { css } from '@emotion/react';
import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import {
  deletePackageInWorkspaceById,
  getRoutinesById,
  getWorkspaceById,
  postPackagesToWorkspace,
  postRoutines,
} from '@api';
import { Button, Input, Modal, SelectDropDown, SelectPackageDropDown } from '@components';
import { QueryKeys } from '@constants';
import { useInput } from '@hooks/useInput';
import { useQueryString } from '@hooks/useQueryString';
import { useSwitch } from '@hooks/useSwitch';
import { queryClient } from '@pages/_app';
import { AlphaToHex, C, Colors, Fonts } from '@styles';
import { parseSubmitDate } from '@utils/parseSubmitDate';

export const WorkspacesViewPage = () => {
  const id = useQueryString('id');
  const [isPackageModalOpened, onOpenPackageModal, onClosePackageModal] = useSwitch();
  const [isRoutineModalOpened, onOpenRoutineModal, onCloseRoutineModal] = useSwitch();
  const [packages, setPackages] = useState<number[]>([]);
  const [duration, onChangeDuration] = useInput();
  const [kickOff, onChangeKickedOff] = useState<number>();
  const { data: workspace } = useQuery([QueryKeys.workspace, id], () => {
    if (id) return getWorkspaceById(+(id || 0));
  });
  const { data: routines } = useQuery([QueryKeys.routines, id], () => {
    if (id) return getRoutinesById(+(id || 0));
  });
  const { mutate: postPackages } = useMutation(
    () => postPackagesToWorkspace(+(id || ''), { surveyPackages: packages }),
    {
      onSuccess: () => {
        onClosePackageModal();
        queryClient.invalidateQueries([QueryKeys.workspace]);
      },
    },
  );
  const { mutate: deletePackage } = useMutation(
    (packageId: number) => deletePackageInWorkspaceById(+(id || 0), packageId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKeys.workspace]);
      },
    },
  );
  const { mutate: _postRoutines } = useMutation(
    () =>
      postRoutines(+(id || ''), {
        duration: +duration,
        kickOff: kickOff || 0,
        routines: [],
      }),
    {
      onSuccess: () => {
        onCloseRoutineModal();
        queryClient.invalidateQueries([QueryKeys.routines]);
      },
    },
  );

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
                <div css={Tag} onClick={() => deletePackage(_package.id)} key={i}>
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
            label='루틴 +'
            onClick={onOpenRoutineModal}
            backgroundColor={`${Colors.highlight}${AlphaToHex['0.5']}`}
          />
        </div>
        <div css={InnerBox}>{!routines?.routines.length && <div css={Empty}>생성된 루틴 없음</div>}</div>
      </div>
      <Modal
        title='패키지 추가'
        onCancel={onClosePackageModal}
        onSubmit={postPackages}
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
      <Modal title='루틴 생성' onCancel={onCloseRoutineModal} onSubmit={_postRoutines} isHidden={!isRoutineModalOpened}>
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
    </div>
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

  > div {
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
