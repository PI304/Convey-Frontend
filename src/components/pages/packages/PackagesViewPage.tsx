import { css } from '@emotion/react';
import { useQuery, useMutation } from 'react-query';
import { getPackageById, patchPackage, postPart } from '@api';
import { AutoResizeTextArea, Button, Input, Modal, PackageBox } from '@components';
import { QueryKeys } from '@constants';
import { useInputs } from '@hooks/useInputs';
import { useQueryString } from '@hooks/useQueryString';
import { useSwitch } from '@hooks/useSwitch';
import { queryClient } from '@pages/_app';
import { C } from '@styles';
import { parseSubmitDate } from '@utils/parseSubmitDate';
import { withoutPropagation } from '@utils/withoutPropagation';

export const PackagesViewPage = () => {
  const id = useQueryString('id');
  const [isMetaModalOpened, onOpenMetaModal, onCloseMetaModal] = useSwitch();
  const [isPartModalOpened, onOpenPartModal, onClosePartModal] = useSwitch();
  const [meta, onChangeMeta, onSetMeta] = useInputs<RequestPackages.Patch>({
    title: '',
    description: '',
    manager: '',
    contacts: [],
  });
  const { data: _package } = useQuery(
    [QueryKeys.package, id],
    () => {
      if (id) return getPackageById(+(id || 0));
    },
    {
      onSuccess: (data) => {
        if (!data) return;
        onSetMeta({
          title: data.title,
          description: data.description,
          manager: data.manager,
          contacts: [],
        });
      },
    },
  );
  const { mutate: patchMeta } = useMutation(() => patchPackage(+(id || 0), meta), {
    onSuccess: () => {
      onCloseMetaModal();
      queryClient.invalidateQueries([QueryKeys.package]);
    },
  });
  const [part, onChangePart] = useInputs<RequestParts.Post>({
    title: '',
    subjects: [],
  });
  const { mutate: _postPart } = useMutation(() => postPart(+(id || 0), part), {
    onSuccess: () => {
      onClosePartModal();
      queryClient.invalidateQueries([QueryKeys.parts]);
    },
  });

  return (
    <div css={Container}>
      <div css={C.Meta}>
        <h1>{_package?.title}&nbsp;</h1>
        <h2>{_package?.description}</h2>
        <p>created. {parseSubmitDate(_package?.createdAt ?? '')}</p>
        <div css={Buttons} onClick={withoutPropagation}>
          <Button label='기본 정보 수정' onClick={onOpenMetaModal} />
          <Button label='디바이더 +' onClick={onOpenPartModal} />
        </div>
      </div>
      {_package && <PackageBox _package={_package} />}
      <Modal title='기본 정보 수정' onCancel={onCloseMetaModal} onSubmit={patchMeta} isHidden={!isMetaModalOpened}>
        <Input value={meta.title} onChange={(e) => onChangeMeta(e, 'title')} placeholder='제목' />
        <AutoResizeTextArea
          value={meta.description}
          onChange={(e) => onChangeMeta(e, 'description')}
          placeholder='설명'
        />
        <Input value={meta.manager} onChange={(e) => onChangeMeta(e, 'manager')} placeholder='담당자' />
      </Modal>
      <Modal title='새로운 디바이더' onCancel={onClosePartModal} onSubmit={_postPart} isHidden={!isPartModalOpened}>
        <Input value={part.title} onChange={(e) => onChangePart(e, 'title')} placeholder='제목' />
      </Modal>
    </div>
  );
};

const Container = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Contacts = css`
  display: flex;
  gap: 1rem;
`;

const Buttons = css`
  display: flex;
  gap: 1rem;
`;
