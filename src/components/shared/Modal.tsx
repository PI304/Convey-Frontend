import { css } from '@emotion/react';
import { Button } from '@components';
import { usePreventScroll } from '@hooks/usePreventScroll';
import { AlphaToHex, C, Colors, Fonts } from '@styles';

export const Modal = ({ title, children, onCancel, onSubmit, isHidden }: ModalProps) => {
  usePreventScroll(!isHidden);
  return (
    <div css={[Background, isHidden && C.hidden]}>
      <div css={Container}>
        <h1>{title}</h1>
        <div css={Inputs}>{children}</div>
        <div css={Buttons}>
          <Button label='취소' onClick={onCancel} />
          <Button label='확인' onClick={onSubmit} backgroundColor={`${Colors.highlight}${AlphaToHex['0.5']}`} />
        </div>
      </div>
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
