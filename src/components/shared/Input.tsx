import { css } from '@emotion/react';
import { Fonts } from '@styles';

export const Input = ({ value, onChange, placeholder, width, disabled }: InputProps) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      css={[Container, { width }]}
      disabled={disabled}
    />
  );
};

const Container = css`
  ${Fonts.medium14}
  border: 0.1rem solid lightgray;
  padding: 0.5rem 0.8rem;
  border-radius: 0.8rem;

  ::placeholder {
    color: lightgray;
  }
`;
