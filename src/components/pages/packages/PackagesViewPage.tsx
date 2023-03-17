import { css } from '@emotion/react';
import { useEffect } from 'react';
import { usePackages, useParts } from '@api';
import { AutoResizeTextArea, Button, Input, Modal, PackageBox } from '@components';
import { useInput } from '@hooks/useInput';
import { useInputs } from '@hooks/useInputs';
import { useQueryString } from '@hooks/useQueryString';
import { useSwitch } from '@hooks/useSwitch';
import { C, Fonts } from '@styles';
import { parseSubmitDate } from '@utils/parseSubmitDate';
import { withoutPropagation } from '@utils/withoutPropagation';

export const PackagesViewPage = () => {
  const id = useQueryString('id');
  const { _postPart } = useParts();
  const { _getPackagesById, _patchPackages } = usePackages(id);
  const [isMetaModalOpened, onOpenMetaModal, onCloseMetaModal] = useSwitch();
  const [isPartModalOpened, onOpenPartModal, onClosePartModal] = useSwitch();
  const [meta, onChangeMeta, onSetMeta] = useInputs<Omit<RequestPackages.Patch, 'contacts'>>({
    title: '',
    description: '',
    manager: '',
  });
  const [email, onChangeEmail, , onManuallyChangeEmail] = useInput();
  const [phone, onChangePhone, , onManuallyChangePhone] = useInput();
  const [part, onChangePart] = useInputs<RequestParts.Post>({
    title: '',
    subjects: [],
  });

  const requestPatchPackages = async () => {
    if (!id) return;
    await _patchPackages.mutateAsync([
      +id,
      {
        ...meta,
        contacts: [
          { type: 'email', content: email },
          { type: 'phone', content: phone },
        ],
      },
    ]);
    onCloseMetaModal();
  };

  const requestPostPart = async () => {
    if (!id) return;
    await _postPart.mutateAsync([+id, part]);
    onClosePartModal();
  };

  const setPrevData = () => {
    if (!_getPackagesById.data) return;
    onSetMeta({
      title: _getPackagesById.data.title,
      description: _getPackagesById.data.description,
      manager: _getPackagesById.data.manager,
    });
    if (!_getPackagesById.data.contacts.length) return;
    _getPackagesById.data.contacts.forEach((contact) => {
      if (contact.type === 'email') onManuallyChangeEmail(contact.content);
      if (contact.type === 'phone') onManuallyChangePhone(contact.content);
    });
  };

  useEffect(() => {
    if (!isMetaModalOpened) return;
    setPrevData();
  }, [isMetaModalOpened]);

  return (
    <div css={Container}>
      <div css={C.Meta}>
        <h1>{_getPackagesById.data?.title}&nbsp;</h1>
        <h2>{_getPackagesById.data?.description}</h2>
        {!!_getPackagesById.data?.contacts.length && (
          <div css={Contacts}>
            <div>manager. {_getPackagesById.data.manager}</div>
            {_getPackagesById.data?.contacts.map((contact, i) => (
              <div key={i}>
                {contact.type}.&nbsp;{contact.content}
              </div>
            ))}
          </div>
        )}
        <p>created. {parseSubmitDate(_getPackagesById.data?.createdAt ?? '')}</p>
        <div css={Buttons} onClick={withoutPropagation}>
          <Button label='기본 정보 수정' onClick={onOpenMetaModal} />
          <Button label='디바이더 +' onClick={onOpenPartModal} />
        </div>
      </div>
      {_getPackagesById.data && <PackageBox _package={_getPackagesById.data} />}
      <Modal
        title='기본 정보 수정'
        onCancel={onCloseMetaModal}
        onSubmit={requestPatchPackages}
        isHidden={!isMetaModalOpened}>
        <Input value={meta.title} onChange={(e) => onChangeMeta(e, 'title')} placeholder='제목' />
        <AutoResizeTextArea
          value={meta.description}
          onChange={(e) => onChangeMeta(e, 'description')}
          placeholder='설명'
        />
        <Input value={meta.manager} onChange={(e) => onChangeMeta(e, 'manager')} placeholder='담당자' />
        <Input value={email} onChange={onChangeEmail} placeholder='이메일' />
        <Input value={phone} onChange={onChangePhone} placeholder='전화번호' />
      </Modal>
      <Modal
        title='새로운 디바이더'
        onCancel={onClosePartModal}
        onSubmit={requestPostPart}
        isHidden={!isPartModalOpened}>
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
  > div {
    ${Fonts.medium14}
    line-height: 150%;
  }
`;

const Buttons = css`
  display: flex;
  gap: 1rem;
`;
