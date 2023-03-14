/* eslint-disable @typescript-eslint/no-empty-function */
import { css } from '@emotion/react';
import { useMutation, useQuery } from 'react-query';
import { getPackages, postPackage } from '@api';
import { AutoResizeTextArea, Board, Button, Input, Modal } from '@components';
import { Paths, QueryKeys } from '@constants';
import { useInputs } from '@hooks/useInputs';
import { useSwitch } from '@hooks/useSwitch';
import { queryClient } from '@pages/_app';
import { Colors, AlphaToHex } from '@styles';

export const PackagesPage = () => {
  const [isModalOpened, onOpenModal, onCloseModal] = useSwitch();
  const [data, onChangeData] = useInputs<RequestPackages.Post>({
    title: '',
    description: '',
    accessCode: '',
    manager: '',
    contacts: [],
  });
  const { data: packages } = useQuery(QueryKeys.packages, getPackages);
  const { mutate: post } = useMutation(() => postPackage(data), {
    onSuccess: () => {
      onCloseModal();
      queryClient.invalidateQueries([QueryKeys.packages]);
    },
  });

  return (
    <div css={Container}>
      <Button
        label='새로운 패키지 +'
        onClick={onOpenModal}
        backgroundColor={`${Colors.highlight}${AlphaToHex['0.5']}`}
      />
      <Board
        heads={['ID', '제목', '작성자']}
        bodies={packages?.map((_package) => [_package.id, _package.title, _package.author.name]) || []}
        viewPath={Paths.packages}
      />
      <Modal title='새로운 패키지' onCancel={onCloseModal} onSubmit={post} isHidden={!isModalOpened}>
        <Input value={data?.title ?? ''} onChange={(e) => onChangeData(e, 'title')} placeholder='제목' />
        <AutoResizeTextArea
          value={data?.description ?? ''}
          onChange={(e) => onChangeData(e, 'description')}
          placeholder='설명'
        />
        <Input value={data?.accessCode ?? ''} onChange={(e) => onChangeData(e, 'accessCode')} placeholder='접근코드' />
        <Input value={data?.manager ?? ''} onChange={(e) => onChangeData(e, 'manager')} placeholder='담당자' />
      </Modal>
    </div>
  );
};

const Container = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
