import { css } from '@emotion/react';
import Link from 'next/link';
import { Paths } from '@constants';
import { useCustomRouter } from '@hooks/useCustomRouter';
import { Colors, Fonts, Sizes } from '@styles';
import { AlphaToHex } from 'src/styles/alphaToHex';

export const Sidebar = () => {
  const { getPathname } = useCustomRouter();

  return (
    <div css={Container}>
      <div>
        <Link href={Paths.workspaces} css={/workspaces/g.test(getPathname()) && Active}>
          workspaces
        </Link>
        <Link href={Paths.packages} css={/packages/g.test(getPathname()) && Active}>
          packages
        </Link>
        <Link href={Paths.surveys} css={/surveys/g.test(getPathname()) && Active}>
          surveys
        </Link>
      </div>
    </div>
  );
};

const Container = css`
  width: ${Sizes.sidebarWidth};
  height: 100vh;
  flex-shrink: 0;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: fixed;

  > div {
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(25vh);
    display: flex;
    flex-direction: column;

    > a {
      ${Fonts.medium16}
      padding: 0.7rem 1.5rem;
      padding-bottom: 0.9rem;
      border-left: 0.35rem solid transparent;
      color: ${Colors.highlight}${AlphaToHex['0.5']};
      transition: 0.3s ease;
    }
  }
`;

const Active = css`
  font-weight: 600 !important;
  border-color: ${Colors.highlight} !important;
  color: ${Colors.highlight} !important;
`;
