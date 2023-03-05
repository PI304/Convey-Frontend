import { css } from '@emotion/react';
import { Fonts } from '@styles';

export const Button = ({ label, onClick }: CommonButtonProps) => {
  return (
    <div onClick={onClick} css={Container}>
      {label}
    </div>
  );
};

const Container = css`
  ${Fonts.medium14};
  width: fit-content;
  padding: 0.5rem 0.8rem;
  border: 0.1rem solid black;
  border-radius: 8px;
  cursor: pointer;
`;
