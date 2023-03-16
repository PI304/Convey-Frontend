import { css } from '@emotion/react';
import { Colors, Fonts } from '@styles';

export const ToggleButton = ({ isActive, onToggle, labelForActive, labelForDeactive }: ToggleButtonProps) => {
  return (
    <div css={[Container.default, isActive && Container.active]} onClick={onToggle}>
      <div css={[Box.default, isActive && Box.active]}>
        <div css={[Circle.default, isActive && Circle.active]} />
      </div>
      <h1>{isActive ? labelForActive : labelForDeactive}</h1>
    </div>
  );
};

const Container = {
  default: css`
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;

    > h1 {
      ${Fonts.medium14}
      color: lightgray;
      transition: 0.3s ease;
    }
  `,
  active: css`
    > h1 {
      color: ${Colors.highlight};
    }
  `,
};

const Box = {
  default: css`
    border: 0.1rem solid lightgray;
    background-color: white;
    width: fit-content;
    width: 3.6rem;
    height: 2.2rem;
    border-radius: 2rem;
    position: relative;
    transition: 0.3s ease;
  `,
  active: css`
    background-color: ${Colors.highlight};
    border-color: ${Colors.highlight};
  `,
};

const Circle = {
  default: css`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: lightgray;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-100%, -50%);
    transition: 0.3s ease;
  `,
  active: css`
    background-color: white;
    transform: translate(0, -50%);
  `,
};
