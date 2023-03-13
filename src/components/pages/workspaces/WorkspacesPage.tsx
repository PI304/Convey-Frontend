import { css } from '@emotion/react';
import { useMutation, useQuery } from 'react-query';
import { getWorkspaces, postWorkspace } from '@api';
import { Board, Button, Input, Modal } from '@components';
import { QueryKeys, Paths } from '@constants';
import { useInputs } from '@hooks/useInputs';
import { useSwitch } from '@hooks/useSwitch';
import { queryClient } from '@pages/_app';
import { AlphaToHex, Colors } from '@styles';

export const WorkspacesPage = () => {
  const [isModalOpened, onOpenModal, onCloseModal] = useSwitch();
  const [data, onChangeData] = useInputs<RequestWorkspaces.Post>({
    name: '',
    accessCode: '',
  });
  const { data: workspaces } = useQuery(QueryKeys.workspaces, getWorkspaces);
  const { mutate: post } = useMutation(() => postWorkspace(data), {
    onSuccess: () => {
      onCloseModal();
      queryClient.invalidateQueries([QueryKeys.workspaces]);
    },
  });

  return (
    <div css={Container}>
      <Button
        label='새로운 워크스페이스 +'
        onClick={onOpenModal}
        backgroundColor={`${Colors.highlight}${AlphaToHex['0.5']}`}
      />
      <Board
        heads={['ID', '이름', '담당자']}
        bodies={
          (workspaces && workspaces?.map((workspace) => [workspace.id, workspace.name, workspace.owner.name])) || []
        }
        viewPath={Paths.workspaces}
      />
      <Modal title='새로운 워크스페이스' onCancel={onCloseModal} onSubmit={post} isHidden={!isModalOpened}>
        <Input value={data.name} onChange={(e) => onChangeData(e, 'name')} placeholder='이름' />
        <Input value={data.accessCode} onChange={(e) => onChangeData(e, 'accessCode')} placeholder='접근코드' />
      </Modal>
    </div>
  );
};

const Container = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
