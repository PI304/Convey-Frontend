import { css } from '@emotion/react';
import { useSetAtom } from 'jotai';
import { Fragment } from 'react';
import {
  writeSurveyInstructionAtom,
  writeSurveyDescriptionAtom,
  writeQuestionNumberAtom,
  writeQuestionContentAtom,
  addQuestionAtom,
  removeQuestionAtom,
  writeChoiceNumberAtom,
  writeChoiceContentAtom,
  addChoiceAtom,
  removeChoiceAtom,
  writeCommonChoiceNumberAtom,
  writeCommonChoiceContentAtom,
  addCommonChoiceAtom,
  removeCommonChoiceAtom,
  addNumberDescFormAtom,
  addStringDescFormAtom,
  addStaticDescFormAtom,
  eraseDescFormAtom,
  toggleChoiceIsDescriptiveAtom,
  removeSurveyAtom,
  toggleSurveyIsLinkedAtom,
} from '@atoms';
import { AutoResizeTextArea, Button, Input, ToggleButton } from '@components';
import { QuestionTypeLables, QuestionTypes } from '@constants';
import { useFormError } from '@hooks/useFormError';
import { useInput } from '@hooks/useInput';
import { C, Fonts } from '@styles';
import { requireAtLeastOneSubstitute } from '@utils/errorCheckers';
import { parseDescForm } from '@utils/parseDescForm';

export const SurveyBox = ({ survey, surveyIdx }: SurveyBoxProps) => {
  const questionType = survey.questionType as ValueOf<typeof QuestionTypes>;
  const removeSurvey = useSetAtom(removeSurveyAtom);
  const writeInstruction = useSetAtom(writeSurveyInstructionAtom);
  const writeDescription = useSetAtom(writeSurveyDescriptionAtom);
  const writeQuestionNumber = useSetAtom(writeQuestionNumberAtom);
  const writeQuestionContent = useSetAtom(writeQuestionContentAtom);
  const addQuestion = useSetAtom(addQuestionAtom);
  const removeQuestion = useSetAtom(removeQuestionAtom);
  const writeChoiceNumber = useSetAtom(writeChoiceNumberAtom);
  const writeChoiceContent = useSetAtom(writeChoiceContentAtom);
  const addChoice = useSetAtom(addChoiceAtom);
  const removeChoice = useSetAtom(removeChoiceAtom);
  const writeCommonChoiceNumber = useSetAtom(writeCommonChoiceNumberAtom);
  const writeCommonChoiceContent = useSetAtom(writeCommonChoiceContentAtom);
  const addCommonChoice = useSetAtom(addCommonChoiceAtom);
  const removeCommonChoice = useSetAtom(removeCommonChoiceAtom);
  const toggleChoiceIsDescriptive = useSetAtom(toggleChoiceIsDescriptiveAtom);
  const toggleSurveyIsLinked = useSetAtom(toggleSurveyIsLinkedAtom);
  return (
    <div css={Container}>
      <div css={QuestionTypeLabel}>{QuestionTypeLables[questionType]}</div>
      <ToggleButton
        isActive={survey.isLinked}
        onToggle={() => toggleSurveyIsLinked({ surveyIdx })}
        labelForActive='링크된 섹터 (답변필수X)'
        labelForDeactive='링크되지 않은 섹터 (답변필수O)'
      />
      {/* Meta */}
      <div css={Meta}>
        <AutoResizeTextArea
          value={survey.description}
          onChange={(e) => writeDescription({ surveyIdx, description: e.target.value })}
          placeholder='이 섹터에 대한 설명을 작성하세요. (필수X)'
          rows={3}
          forwardCss={css`
            width: 100%;
          `}
          isOptional
        />
        <div css={Meta}>
          <AutoResizeTextArea
            value={survey.instruction}
            onChange={(e) => writeInstruction({ surveyIdx, instruction: e.target.value })}
            placeholder='이 섹터에 대한 지시문을 작성하세요. (필수X)'
            rows={2}
            forwardCss={css`
              width: 100%;
            `}
            isOptional
          />
        </div>
      </div>
      <div css={Table}>
        {/* Head */}
        <div>번호</div>
        <div>항목</div>
        {/* 응답기준 */}
        {survey.commonChoices && (
          <div>
            {survey.commonChoices.map((commonChoice, choiceIdx) => (
              <div key={choiceIdx}>
                <Input
                  value={commonChoice.content + ''}
                  onChange={(e) => writeCommonChoiceContent({ surveyIdx, choiceIdx, content: e.target.value })}
                  placeholder={'기준' + commonChoice.number}
                />
                <Button label='기준삭제' onClick={() => removeCommonChoice({ surveyIdx, choiceIdx })} />
              </div>
            ))}
            <Button label='기준추가' onClick={() => addCommonChoice({ surveyIdx, questionType })} />
          </div>
        )}
        {!survey.commonChoices && <div>응답기준</div>}
        {/* Body */}
        {survey.questions.map((question, questionIdx) => (
          <Fragment key={questionIdx}>
            {/* 번호 */}
            <div>
              <Input
                value={question.number + ''}
                onChange={(e) => writeQuestionNumber({ surveyIdx, questionIdx, number: +e.target.value })}
                placeholder='번호'
                width='4rem'
              />
              <div css={RemoveQuestionButton}>
                <Button label='질문삭제' onClick={() => removeQuestion({ surveyIdx, questionIdx })} />
              </div>
            </div>
            {/* 질문 */}
            <div>
              <AutoResizeTextArea
                value={question.content}
                onChange={(e) => writeQuestionContent({ surveyIdx, questionIdx, content: e.target.value })}
                placeholder={'질문' + question.number}
                width='100%'
                forwardCss={css`
                  width: 100%;
                `}
              />
            </div>
            {/* 선지 */}
            <div css={[Choices.default, survey.commonChoices ? Choices.common : Choices.notCommon]}>
              {/* 공통선지 */}
              {survey.commonChoices &&
                survey.commonChoices.map((commonChoice, choiceIdx) => (
                  <div css={Choice} key={choiceIdx}>
                    <div>
                      <Input
                        value={commonChoice.number + ''}
                        onChange={(e) => writeCommonChoiceNumber({ surveyIdx, choiceIdx, number: +e.target.value })}
                        placeholder='번호'
                      />
                    </div>
                  </div>
                ))}
              {/* 개별선지 */}
              {!survey.commonChoices &&
                question.choices?.map((choice, choiceIdx) => (
                  <div css={Choice} key={choiceIdx}>
                    <div>
                      <Input
                        value={choice.number + ''}
                        onChange={(e) =>
                          writeChoiceNumber({ surveyIdx, questionIdx, choiceIdx, number: +e.target.value })
                        }
                        placeholder='번호'
                        width='4rem'
                      />
                    </div>
                    {choice.content !== null && (
                      <div>
                        <Input
                          value={choice.content}
                          onChange={(e) =>
                            writeChoiceContent({ surveyIdx, questionIdx, choiceIdx, content: e.target.value })
                          }
                          placeholder={'선지' + choice.number}
                          width='20rem'
                        />
                      </div>
                    )}
                    {/* 서술형식 */}
                    {choice.isDescriptive && (
                      <DescFormBox
                        surveyIdx={surveyIdx}
                        questionIdx={questionIdx}
                        choiceIdx={choiceIdx}
                        choice={choice}
                      />
                    )}
                    {/* 서술 ON/OFF */}
                    {survey.questionType !== QuestionTypes.shortAnswer && (
                      <Button
                        label={choice.isDescriptive ? '서술OFF' : '서술ON'}
                        onClick={() => toggleChoiceIsDescriptive({ surveyIdx, questionIdx, choiceIdx })}
                        backgroundColor={choice.isDescriptive ? 'lightpink' : 'lightblue'}
                      />
                    )}
                    <Button label='선지삭제' onClick={() => removeChoice({ surveyIdx, questionIdx, choiceIdx })} />
                  </div>
                ))}
              {!survey.commonChoices && questionType !== QuestionTypes.longAnswer && (
                <Button label='선지추가' onClick={() => addChoice({ surveyIdx, questionIdx, questionType })} />
              )}
            </div>
          </Fragment>
        ))}
      </div>
      <Button label='질문추가' onClick={() => addQuestion({ surveyIdx, questionType })} />
      <Button label='서베이삭제' onClick={() => removeSurvey({ surveyIdx })} backgroundColor='lightcoral' />
    </div>
  );
};

const DescFormBox = ({ surveyIdx, questionIdx, choiceIdx, choice }: DescFormBoxProps) => {
  const { checkIsError } = useFormError(choice.descForm ?? '', false, () => requireAtLeastOneSubstitute(choice));

  const [staticDesc, onChangeStaticDesc] = useInput();
  const addNumberDescForm = useSetAtom(addNumberDescFormAtom);
  const addStringDescForm = useSetAtom(addStringDescFormAtom);
  const addStaticDescForm = useSetAtom(addStaticDescFormAtom);
  const eraseDescForm = useSetAtom(eraseDescFormAtom);

  return (
    <div css={[DescForm, checkIsError() && C.Error]} className='DescForm'>
      <div>{parseDescForm(choice.descForm || '') || <span css={{ color: 'dimgray' }}>서술형식을 입력하세요</span>}</div>
      <div>
        <Button label='숫자' onClick={() => addNumberDescForm({ surveyIdx, questionIdx, choiceIdx })} />
        <Button label='문자' onClick={() => addStringDescForm({ surveyIdx, questionIdx, choiceIdx })} />
        <Input value={staticDesc} onChange={onChangeStaticDesc} placeholder='추가할 글자' width='10rem' isOptional />
        <Button
          label='글자'
          onClick={() => addStaticDescForm({ surveyIdx, questionIdx, choiceIdx, content: staticDesc })}
        />
        <Button label='지우기' onClick={() => eraseDescForm({ surveyIdx, questionIdx, choiceIdx })} />
      </div>
    </div>
  );
};

const Container = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  padding: 1rem;
  border: 0.1rem solid lightgray;
  border-radius: 0.8rem;

  > button:last-of-type {
    margin-left: auto;
  }
`;

const QuestionTypeLabel = css`
  ${Fonts.medium14}
  width: fit-content;
  padding: 0.6rem 0.9rem;
  border-radius: 0.6rem;
  background-color: #808a9f;
  color: white;
`;

const Table = css`
  display: grid;
  grid-template-columns: repeat(3, auto);
  border: 0.1rem solid dimgray;
  border-radius: 0.6rem;
  overflow: hidden;

  > div {
    padding: 1rem 1.3rem;
    border-right: 0.1rem solid dimgray;
    border-bottom: 0.1rem solid dimgray;

    :nth-of-type(3) > div {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    :nth-of-type(3n) {
      display: flex;
      gap: 1rem;
      border-right: 0;
    }

    :nth-of-type(3n + 1) {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    :nth-of-type(3n + 2) {
      min-width: 35rem;
    }

    :nth-last-of-type(-n + 3) {
      border-bottom: 0;
    }

    :nth-of-type(1),
    :nth-of-type(2),
    :nth-of-type(3) {
      background-color: #dbe6fb;
    }
  }
`;

const Meta = css`
  grid-column: 1/4;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Choices = {
  default: css`
    gap: 2rem;
  `,
  common: css`
    flex-direction: row;
  `,
  notCommon: css`
    flex-direction: column;
  `,
};

const Choice = css`
  display: flex;
  gap: 1rem;

  > div:not(.DescForm) {
    display: flex;
    align-items: flex-start;
  }
`;

const DescForm = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 0.1rem solid dimgray;
  border-radius: 0.6rem;
  padding: 1rem;

  > div {
    ${Fonts.medium14}
    display: flex;
    gap: 0.5rem;
  }
`;

const RemoveQuestionButton = css`
  margin-top: auto;
`;
