import { css } from '@emotion/react';
import { useQuery } from 'react-query';
import { getSurveys } from '@api';
import { QueryKeys } from '@constants';
import { useSwitch } from '@hooks/useSwitch';
import { Fonts } from '@styles';

export const SelectSurveyDropDown = ({ selectedSurvey, onSelect, disabled }: SelectSurveyDropDownProps) => {
  const [isOpened, onOpen, onClose] = useSwitch();
  const { data: surveys } = useQuery(QueryKeys.surveys, () => getSurveys(1));
  return (
    <div css={Container}>
      <button css={Selected} onClick={onOpen} onBlur={onClose} disabled={disabled}>
        {selectedSurvey}
        {isOpened && (
          <div css={Options}>
            {surveys?.map((survey, i) => (
              <div css={Option} onClick={() => onSelect(survey.id)} key={i}>
                {survey.title}
              </div>
            ))}
          </div>
        )}
      </button>
    </div>
  );
};

const Container = css`
  position: relative;
`;

const Selected = css`
  ${Fonts.medium14}
  width: 18rem;
  border: 0.1rem solid lightgray;
  padding: 0.6rem 0.8rem;
  border-radius: 0.8rem;
  background-color: white;

  :disabled {
    background-color: #ececec4b;
  }
`;

const Options = css`
  width: 18rem;
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
  padding: 0.5rem 0.8rem;

  :hover {
    background-color: #d3d3d395;
  }
`;
