import { css } from '@emotion/react';
import { useState } from 'react';

export const IndexPage = () => {
  const [isFocused, setIsFocused] = useState(true);

  const onToggle = () => setIsFocused(!isFocused);

  return (
    <div css={[Container.default, isFocused && Container.isFocused]}>
      IndexPage &nbsp;<button onClick={onToggle}>버튼</button>
    </div>
  );
};

const Container = {
  default: css`
    font-size: 2rem;
    background-color: beige;
  `,
  isFocused: css`
    background-color: pink;
  `,
};
