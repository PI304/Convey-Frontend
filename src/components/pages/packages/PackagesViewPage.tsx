import { css } from '@emotion/react';
import { useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import { getPackageById, patchPackage, postPart } from '@api';
import { AutoResizeTextArea, Button, Input, Modal, PackageBox } from '@components';
import { QueryKeys } from '@constants';
import { useInput } from '@hooks/useInput';
import { useInputs } from '@hooks/useInputs';
import { useQueryString } from '@hooks/useQueryString';
import { useSwitch } from '@hooks/useSwitch';
import { queryClient } from '@pages/_app';
import { C, Fonts } from '@styles';
import { parseSubmitDate } from '@utils/parseSubmitDate';
import { withoutPropagation } from '@utils/withoutPropagation';

export const PackagesViewPage = () => {
  const id = useQueryString('id');
  const [isMetaModalOpened, onOpenMetaModal, onCloseMetaModal] = useSwitch();
  const [isPartModalOpened, onOpenPartModal, onClosePartModal] = useSwitch();
  const [meta, onChangeMeta, onSetMeta] = useInputs<Omit<RequestPackages.Patch, 'contacts'>>({
    title: '',
    description: '',
    manager: '',
  });
  const [email, onChangeEmail, , onManuallyChangeEmail] = useInput();
  const [phone, onChangePhone, , onManuallyChangePhone] = useInput();
  const { data: _package } = useQuery([QueryKeys.package, id], () => {
    if (id) return getPackageById(+(id || 0));
  });
  const { mutate: patchMeta } = useMutation(
    () =>
      patchPackage(+(id || 0), {
        ...meta,
        contacts: [
          { type: 'email', content: email },
          { type: 'phone', content: phone },
        ],
      }),
    {
      onSuccess: () => {
        onCloseMetaModal();
        queryClient.invalidateQueries([QueryKeys.package]);
      },
    },
  );
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

  const setPrevData = () => {
    if (!_package) return;
    onSetMeta({
      title: _package.title,
      description: _package.description,
      manager: _package.manager,
    });
    if (!_package.contacts.length) return;
    _package.contacts.forEach((contact) => {
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
        <h1>{_package?.title}&nbsp;</h1>
        <h2>{_package?.description}</h2>
        {!!_package?.contacts.length && (
          <div css={Contacts}>
            <div>manager. {_package.manager}</div>
            {_package?.contacts.map((contact, i) => (
              <div key={i}>
                {contact.type}.&nbsp;{contact.content}
              </div>
            ))}
          </div>
        )}
        <p>created. {parseSubmitDate(_package?.createdAt ?? '')}</p>
        <div css={Buttons} onClick={withoutPropagation}>
          <Button label='?????? ?????? ??????' onClick={onOpenMetaModal} />
          <Button label='???????????? +' onClick={onOpenPartModal} />
        </div>
      </div>
      {_package && <PackageBox _package={_package} />}
      <Modal title='?????? ?????? ??????' onCancel={onCloseMetaModal} onSubmit={patchMeta} isHidden={!isMetaModalOpened}>
        <Input value={meta.title} onChange={(e) => onChangeMeta(e, 'title')} placeholder='??????' />
        <AutoResizeTextArea
          value={meta.description}
          onChange={(e) => onChangeMeta(e, 'description')}
          placeholder='??????'
        />
        <Input value={meta.manager} onChange={(e) => onChangeMeta(e, 'manager')} placeholder='?????????' />
        <Input value={email} onChange={onChangeEmail} placeholder='?????????' />
        <Input value={phone} onChange={onChangePhone} placeholder='????????????' />
      </Modal>
      <Modal title='????????? ????????????' onCancel={onClosePartModal} onSubmit={_postPart} isHidden={!isPartModalOpened}>
        <Input value={part.title} onChange={(e) => onChangePart(e, 'title')} placeholder='??????' />
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
