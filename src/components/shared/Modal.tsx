import { css } from '@emotion/react';
import { useAtomValue } from 'jotai';
import { formErrorsAtom } from '@atoms';
import { Button } from '@components';
import { usePreventScroll } from '@hooks/usePreventScroll';
import { AlphaToHex, C, Colors, Fonts } from '@styles';
import { withoutPropagation } from '@utils/withoutPropagation';

export const Modal = ({ title, children, onCancel, onSubmit, isHidden }: ModalProps) => {
  const formErrors = useAtomValue(formErrorsAtom);
  usePreventScroll(!isHidden);
  return (
    <div css={[Background, isHidden && C.Hidden]} onClick={withoutPropagation}>
      {!isHidden && (
        <div css={Container}>
          <h1>{title}</h1>
          <div css={Inputs}>{children}</div>
          <div css={Buttons}>
            <Button label='취소' onClick={onCancel} />
            <Button
              label='확인'
              onClick={onSubmit}
              backgroundColor={`${Colors.highlight}${AlphaToHex['0.5']}`}
              disabled={!!formErrors.length}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const Background = css`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(20, 20, 22, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s ease;
  z-index: 100;
`;

const Container = css`
  width: 35rem;
  background-color: white;
  border-radius: 0.8rem;
  padding: 1.5rem;
  padding-top: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  > h1 {
    ${Fonts.bold18}
    color: ${Colors.highlight}
  }
`;

const Inputs = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Buttons = css`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;
