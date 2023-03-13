import { css } from '@emotion/react';
import { Fonts } from '@styles';

export const C = {
  hidden: css`
    visibility: hidden;
    opacity: 0;
  `,

  form: css`
    ${Fonts.medium14}
    border: 0.1rem solid lightgray;
    padding: 0.5rem 0.8rem;
    border-radius: 0.8rem;
    line-height: 130%;

    ::placeholder {
      color: lightgray;
    }
  `,
};
