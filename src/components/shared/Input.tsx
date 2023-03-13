import { C } from '@styles';

export const Input = ({ value, onChange, placeholder, width, disabled }: InputProps) => {
  return (
    <input value={value} onChange={onChange} placeholder={placeholder} css={[C.Form, { width }]} disabled={disabled} />
  );
};
