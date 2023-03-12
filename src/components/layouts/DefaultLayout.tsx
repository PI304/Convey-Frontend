import { css } from '@emotion/react';
import { Colors } from '@styles';
import { LayoutProps } from '_types/client';

export const DefaultLayout = ({ children, forwardCss }: LayoutProps) => {
  return <div css={[Container, forwardCss]}>{children}</div>;
};

const Container = css`
  width: 100vw;
  min-height: 100vh;
  background-color: ${Colors.background};
`;
