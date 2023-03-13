import { css } from '@emotion/react';
import { useSwitch } from '@hooks/useSwitch';
import { AlphaToHex, Colors, Fonts, svgChevronRight } from '@styles';
import { withoutPropagation } from '@utils/withoutPropagation';
import { ForwardCssType } from '_types/client';

export const SelectDropDown = <T extends { id: number; title: string }[]>({
  label,
  onSelect,
  disabled,
  data,
  forwardCss,
}: SelectDropDownProps<T> & ForwardCssType) => {
  const [isOpened, onOpen, onClose] = useSwitch();

  const onRequestOnSelect = (e: React.MouseEvent, id: number) => {
    withoutPropagation(e);
    onSelect(id);
    onClose();
  };

  return (
    <div css={[Container, forwardCss]}>
      <button css={Selected} onClick={onOpen} onBlur={onClose} disabled={disabled}>
        {label}
        {isOpened && (
          <div css={Options}>
            {data?.map((data, i) => (
              <div css={Option} onClick={(e) => onRequestOnSelect(e, data.id)} key={i}>
                {data.id}
                {svgChevronRight}
                {data.title}
              </div>
            ))}
          </div>
        )}
      </button>
    </div>
  );
};

const Container = css`
  width: 18rem;
  position: relative;
`;

const Selected = css`
  ${Fonts.medium14}
  width: 100%;
  border: 0.1rem solid lightgray;
  padding: 0.6rem 0.8rem;
  border-radius: 0.8rem;
  background-color: white;

  :disabled {
    background-color: #ececec4b;
  }
`;

const Options = css`
  width: 100%;
  border: 0.1rem solid lightgray;
  border-radius: 0.8rem;
  background-color: white;
  position: absolute;
  left: 0;
  transform: translateY(1rem);
  z-index: 10;
  overflow: hidden;
`;

const Option = css`
  ${Fonts.medium14}
  padding: 0.5rem 0.8rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  > svg {
    transform: scale(90%);

    > path {
      fill: ${Colors.highlight}${AlphaToHex['0.5']};
    }
  }

  :hover {
    background-color: #d3d3d395;
  }
`;
