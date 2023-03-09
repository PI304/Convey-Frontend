import { css } from '@emotion/react';
import Link from 'next/link';
import { Paths } from '@constants';
import { Colors, Fonts } from '@styles';

export const Sidebar = () => {
  return (
    <div css={Container}>
      <h1>SIDEBAR</h1>
      <Link href={Paths.workspaces}>
        <h2>워크스페이스</h2>
      </Link>
      <Link href={Paths.packages}>
        <h2>설문패키지</h2>
      </Link>
      <Link href={Paths.surveys}>
        <h2>설문(=소주제)</h2>
      </Link>
    </div>
  );
};

const Container = css`
  width: 20rem;
  flex-shrink: 0;
  padding: 5rem 0;
  background-color: ${Colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  > h1 {
    ${Fonts.semiBold18}
    margin-bottom: 2rem;
  }

  > h2 {
  }
`;
