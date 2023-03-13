import { css } from '@emotion/react';
import { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { deletePackageInWorkspaceById, getRoutinesById, getWorkspaceById, postPackagesToWorkspace } from '@api';
import { Button, Modal, SelectPackageDropDown } from '@components';
import { QueryKeys } from '@constants';
import { useQueryString } from '@hooks/useQueryString';
import { useSwitch } from '@hooks/useSwitch';
import { queryClient } from '@pages/_app';
import { AlphaToHex, C, Colors, Fonts } from '@styles';
import { parseSubmitDate } from '@utils/parseSubmitDate';

export const WorkspacesViewPage = () => {
  const id = useQueryString('id');
  const [isPackageModalOpened, onOpenPackageModal, onClosePackageModal] = useSwitch();
  const [packages, setPackages] = useState<number[]>([]);
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
  const { mutate: deletePackage } = useMutation((packageId: number) => deletePackageInWorkspaceById(packageId), {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKeys.workspace]);
    },
  });

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
                <div css={Tag} onClick={() => deletePackage(_package)} key={i}>
                  {_package}
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
            onClick={() => alert('루틴')}
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
                {_package}
              </div>
            ))}
          </div>
        )}
        <SelectPackageDropDown onSelect={(packageId) => onAddPackage(packageId)} />
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
  padding: 0.5rem 0.8rem;
  border-radius: 0.3rem;
  background-color: ${Colors.highlight}${AlphaToHex['0.5']};
  width: fit-content;
  cursor: pointer;
  transition: 0.3s ease;

  :hover {
    background-color: lightcoral;
    color: white;
  }
`;
