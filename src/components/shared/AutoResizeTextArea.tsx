import { useRef, MutableRefObject, useEffect } from 'react';
import { useFormError } from '@hooks/useFormError';
import { C } from '@styles';
import { ForwardCssType } from '_types/client';

export const AutoResizeTextArea = ({
  value,
  onChange,
  placeholder,
  rows,
  forwardCss,
  isOptional = false,
}: AutoResizeTextAreaProps & ForwardCssType) => {
  const { checkIsError } = useFormError(value, isOptional);
  const textAreaRef = useRef() as MutableRefObject<HTMLTextAreaElement>;

  const autoResize = () => {
    textAreaRef.current.style.height = 'auto';
    const height = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = height / 10 + 'rem';
  };

  useEffect(() => {
    autoResize();
  }, [value]);

  return (
    <textarea
      value={value}
      onChange={onChange as any}
      placeholder={placeholder}
      ref={textAreaRef}
      rows={rows || 1}
      css={[C.Form, forwardCss, checkIsError() && C.Error]}
    />
  );
};
