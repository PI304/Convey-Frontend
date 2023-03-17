/* eslint-disable @typescript-eslint/no-empty-function */
import { css } from '@emotion/react';
import { usePackages } from '@api';
import { AutoResizeTextArea, Board, Button, Input, Modal } from '@components';
import { Paths } from '@constants';
import { useInput } from '@hooks/useInput';
import { useInputs } from '@hooks/useInputs';
import { useSwitch } from '@hooks/useSwitch';
import { Colors, AlphaToHex } from '@styles';

export const PackagesPage = () => {
  const { _getPackages, _postPackages } = usePackages();
  const [isModalOpened, onOpenModal, onCloseModal] = useSwitch();
  const [data, onChangeData] = useInputs<Omit<RequestPackages.Post, 'contacts'>>({
    title: '',
    description: '',
    accessCode: '',
    manager: '',
  });
  const [email, onChangeEmail] = useInput();
  const [phone, onChangePhone] = useInput();

  const requestPostPackages = async () => {
    await _postPackages.mutateAsync([
      {
        ...data,
        contacts: [
          { type: 'email', content: email },
          { type: 'phone', content: phone },
        ],
      },
    ]);
    onCloseModal();
  };

  return (
    <div css={Container}>
      <Button
        label='새로운 패키지 +'
        onClick={onOpenModal}
        backgroundColor={`${Colors.highlight}${AlphaToHex['0.5']}`}
      />
      <Board
        heads={['ID', '제목', '작성자']}
        bodies={_getPackages.data?.map((_package) => [_package.id, _package.title, _package.author.name]) || []}
        viewPath={Paths.packages}
      />
      <Modal title='새로운 패키지' onCancel={onCloseModal} onSubmit={requestPostPackages} isHidden={!isModalOpened}>
        <Input value={data?.title ?? ''} onChange={(e) => onChangeData(e, 'title')} placeholder='제목' />
        <AutoResizeTextArea
          value={data?.description ?? ''}
          onChange={(e) => onChangeData(e, 'description')}
          placeholder='설명'
        />
        <Input value={data?.accessCode ?? ''} onChange={(e) => onChangeData(e, 'accessCode')} placeholder='접근코드' />
        <Input value={data?.manager ?? ''} onChange={(e) => onChangeData(e, 'manager')} placeholder='담당자' />
        <Input value={email} onChange={onChangeEmail} placeholder='이메일' />
        <Input value={phone} onChange={onChangePhone} placeholder='전화번호' />
      </Modal>
    </div>
  );
};

const Container = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
