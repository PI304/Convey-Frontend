import { css } from '@emotion/react';
import { Fonts } from '@styles';

export const Button = ({ label, onClick, backgroundColor, disabled }: CommonButtonProps) => {
  return (
    <button onClick={onClick} css={[Container, { backgroundColor }]} disabled={disabled}>
      {label}
    </button>
  );
};

const Container = css`
  ${Fonts.medium14};
  width: fit-content;
  height: fit-content;
  display: block;
  padding: 0.5rem 0.8rem;
  border: 0.1rem solid dimgray;
  border-radius: 8px;
  cursor: pointer;
  white-space: nowrap;
  background-color: lightgray;

  :disabled {
    background-color: #e2e1e1;
    border-color: lightgray;
    color: white;
    cursor: default;
  }
`;
