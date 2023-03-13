import { css } from '@emotion/react';
import { Fonts } from '@styles';

export const C = {
  Hidden: css`
    visibility: hidden;
    opacity: 0;
  `,

  Form: css`
    ${Fonts.medium14}
    border: 0.1rem solid lightgray;
    padding: 0.5rem 0.8rem;
    border-radius: 0.8rem;
    line-height: 130%;

    ::placeholder {
      color: lightgray;
    }
  `,

  Meta: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-bottom: 0.1rem solid lightgray;
    padding-bottom: 2rem;

    > h1 {
      ${Fonts.semiBold32}

      > span {
        ${Fonts.medium16}
      }
    }

    > h2 {
      ${Fonts.medium16}
      white-space: pre-wrap;
      line-height: 140%;
    }

    > p {
      ${Fonts.light14}
    }
  `,
};
