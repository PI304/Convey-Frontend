import { css } from '@emotion/react';
import { DefaultLayout, Sidebar } from '@components';
import { Sizes } from '@styles';
import { LayoutProps } from '_types/client';

export const WithSidebarLayout = ({ children }: LayoutProps) => {
  return (
    <DefaultLayout forwardCss={Container}>
      <Sidebar />
      <section>{children}</section>
    </DefaultLayout>
  );
};

const Container = css`
  > section {
    padding: 3rem;
    display: flex;
    overflow: scroll;
    margin-left: ${Sizes.sidebarWidth};
    min-height: 100vh;
  }
`;
