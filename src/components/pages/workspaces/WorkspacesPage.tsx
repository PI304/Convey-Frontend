import { css } from '@emotion/react';
import { useWorkspaces } from '@api';
import { Board, Button, Input, Modal, PageButton } from '@components';
import { Paths } from '@constants';
import { useChange } from '@hooks/useChange';
import { useInputs } from '@hooks/useInputs';
import { useSwitch } from '@hooks/useSwitch';
import { AlphaToHex, Colors } from '@styles';
import { requireContentAndMinLength } from '@utils/errorCheckers';

export const WorkspacesPage = () => {
  const { _getWorkspaces, _postWorkspace, _deleteWorkspace } = useWorkspaces();

  const [page, onChangePage] = useChange(1);
  const { data: workspaces } = _getWorkspaces(page);

  const [isModalOpened, onOpenModal, onCloseModal] = useSwitch();
  const [data, onChangeData] = useInputs<RequestWorkspaces.Post>({
    name: '',
    accessCode: '',
  });

  const requestPostWorkspace = async () => {
    await _postWorkspace.mutateAsync([data]);
    onCloseModal();
  };

  return (
    <div css={Container}>
      <Button
        label='새로운 워크스페이스 +'
        onClick={onOpenModal}
        backgroundColor={`${Colors.highlight}${AlphaToHex['0.5']}`}
      />
      <PageButton currentPage={page} totalPageCount={workspaces?.totalPageCount ?? 1} onChangePage={onChangePage} />
      <Board
        heads={['ID', '이름', '담당자']}
        bodies={workspaces?.results.map((workspace) => [workspace.id, workspace.name, workspace.owner.name]) || []}
        viewPath={Paths.workspaces}
        onDelete={_deleteWorkspace.mutate}
      />
      <Modal
        title='새로운 워크스페이스'
        onCancel={onCloseModal}
        onSubmit={requestPostWorkspace}
        isHidden={!isModalOpened}>
        <Input value={data.name} onChange={(e) => onChangeData(e, 'name')} placeholder='이름' />
        <Input
          value={data.accessCode}
          onChange={(e) => onChangeData(e, 'accessCode')}
          placeholder='접근코드 (6자리이상)'
          errorChecker={() => requireContentAndMinLength(data.accessCode, 6)}
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
