import { css } from '@emotion/react';
import { DefaultLayout, Sidebar } from '@components';
import { LayoutProps } from '_types/client';

export const WithSidebarLayout = ({ children }: LayoutProps) => {
  return (
    <DefaultLayout forwardCss={Container}>
      <Sidebar />
      {children}
    </DefaultLayout>
  );
};

const Container = css`
  display: flex;
`;
