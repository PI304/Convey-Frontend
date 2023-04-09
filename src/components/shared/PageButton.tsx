import { css } from '@emotion/react';
import { Colors } from '@styles';

export const PageButton = ({ currentPage, totalPageCount, onChangePage }: PageButtonProps) => {
  return (
    <div css={Wrapper}>
      {Array(totalPageCount)
        .fill(0)
        .map((_, i) => i + 1)
        .map((page) => (
          <button onClick={() => onChangePage(page)} css={currentPage === page && Current} key={page}>
            {page}
          </button>
        ))}
    </div>
  );
};

const Wrapper = css`
  margin: 0 auto;
  display: flex;
  gap: 1rem;
`;

const Current = css`
  color: ${Colors.highlight};
  text-decoration: underline;
  text-underline-position: under;
`;
