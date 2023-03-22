import { useFormError } from '@hooks/useFormError';
import { C } from '@styles';

export const Input = ({
  value,
  onChange,
  placeholder,
  width,
  disabled,
  isOptional = false,
  errorChecker,
}: InputProps) => {
  const { checkIsError } = useFormError(value, isOptional, errorChecker);
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      css={[C.Form, { width }, checkIsError() && C.Error]}
      disabled={disabled}
    />
  );
};
