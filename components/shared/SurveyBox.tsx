import { css } from '@emotion/react';
import { useSetAtom } from 'jotai';
import { Fragment } from 'react';
import {
  writeSurveyTitleAtom,
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
} from '@atoms';
import { Button, Input } from '@components';
import { QuestionTypeLables, QuestionTypes } from '@constants';
import { useInput } from '@hooks/useInput';
import { Fonts } from '@styles';
import { parseDescForm } from '@utils';

export const SurveyBox = ({ survey, surveyIdx }: SurveyBoxProps) => {
  const questionType = survey.questionType as ValueOf<typeof QuestionTypes>;
  const [staticDesc, onChangeStaticDesc] = useInput();
  const removeSurvey = useSetAtom(removeSurveyAtom);
  const writeTitle = useSetAtom(writeSurveyTitleAtom);
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
  const addNumberDescForm = useSetAtom(addNumberDescFormAtom);
  const addStringDescForm = useSetAtom(addStringDescFormAtom);
  const addStaticDescForm = useSetAtom(addStaticDescFormAtom);
  const eraseDescForm = useSetAtom(eraseDescFormAtom);
  const toggleChoiceIsDescriptive = useSetAtom(toggleChoiceIsDescriptiveAtom);
  return (
    <div css={Container}>
      <div css={QuestionTypeLabel}>{QuestionTypeLables[questionType]}</div>
      <div css={Meta}>
        <Input
          value={survey.title}
          onChange={(e) => writeTitle({ surveyIdx, title: e.target.value })}
          placeholder='제목'
          width='30%'
        />
      </div>
      <div css={Meta}>
        <Input
          value={survey.description}
          onChange={(e) => writeDescription({ surveyIdx, description: e.target.value })}
          placeholder='제목'
          width='50%'
        />
      </div>
      <div css={Table}>
        {/* Head */}
        <div>번호</div>
        <div>항목</div>
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
            <div>
              <Input
                value={question.content}
                onChange={(e) => writeQuestionContent({ surveyIdx, questionIdx, content: e.target.value })}
                placeholder={'질문' + question.number}
                width='100%'
              />
            </div>
            <div css={[Choices.default, survey.commonChoices ? Choices.common : Choices.notCommon]}>
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
                    {choice.isDescriptive && (
                      <div css={DescForm} className='DescForm'>
                        <div>
                          {parseDescForm(choice.descForm || '') || (
                            <span css={{ color: 'dimgray' }}>서술형식을 입력하세요</span>
                          )}
                        </div>
                        <div>
                          <Button
                            label='숫자'
                            onClick={() => addNumberDescForm({ surveyIdx, questionIdx, choiceIdx })}
                          />
                          <Button
                            label='문자'
                            onClick={() => addStringDescForm({ surveyIdx, questionIdx, choiceIdx })}
                          />
                          <Input
                            value={staticDesc}
                            onChange={onChangeStaticDesc}
                            placeholder='추가할 글자'
                            width='10rem'
                          />
                          <Button
                            label='글자'
                            onClick={() =>
                              addStaticDescForm({ surveyIdx, questionIdx, choiceIdx, content: staticDesc })
                            }
                          />
                          <Button label='지우기' onClick={() => eraseDescForm({ surveyIdx, questionIdx, choiceIdx })} />
                        </div>
                      </div>
                    )}
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
