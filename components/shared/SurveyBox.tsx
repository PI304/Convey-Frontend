import { css } from '@emotion/react';
import { useSetAtom } from 'jotai';
import { Fragment } from 'react';
import { Button } from './Button';
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
import { QuestionTypeLables, QuestionTypes } from '@constants';
import { useInput } from '@hooks/useInput';

export const SurveyBox = ({ survey, surveyIdx }: SurveyBoxProps) => {
  const questionType = survey.questionType as ValueOf<typeof QuestionTypes>;
  const [staticDesc, onChangeStaticDesc, onResetStaticDesc] = useInput();
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
      <Button label='서베이삭제' onClick={() => removeSurvey({ surveyIdx })} />
      <div css={Meta}>
        <input
          value={survey.title}
          onChange={(e) => writeTitle({ surveyIdx, title: e.target.value })}
          placeholder='제목'
        />
      </div>
      <div css={Meta}>
        <input
          value={survey.description}
          onChange={(e) => writeDescription({ surveyIdx, description: e.target.value })}
          placeholder='제목'
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
                <input
                  value={commonChoice.content + ''}
                  onChange={(e) => writeCommonChoiceContent({ surveyIdx, choiceIdx, content: e.target.value })}
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
              <input
                value={question.number}
                onChange={(e) => writeQuestionNumber({ surveyIdx, questionIdx, number: +e.target.value })}
              />
              <div>
                <Button label='질문삭제' onClick={() => removeQuestion({ surveyIdx, questionIdx })} />
              </div>
            </div>
            <div>
              <input
                value={question.content}
                onChange={(e) => writeQuestionContent({ surveyIdx, questionIdx, content: e.target.value })}
              />
            </div>
            <div css={[Choices.default, survey.commonChoices ? Choices.common : Choices.notCommon]}>
              {survey.commonChoices &&
                survey.commonChoices.map((commonChoice, choiceIdx) => (
                  <div css={Choice} key={choiceIdx}>
                    <div>
                      <input
                        value={commonChoice.number}
                        onChange={(e) => writeCommonChoiceNumber({ surveyIdx, choiceIdx, number: +e.target.value })}
                      />
                    </div>
                  </div>
                ))}
              {!survey.commonChoices &&
                question.choices?.map((choice, choiceIdx) => (
                  <div css={Choice} key={choiceIdx}>
                    <div>
                      <input
                        value={choice.number}
                        onChange={(e) =>
                          writeChoiceNumber({ surveyIdx, questionIdx, choiceIdx, number: +e.target.value })
                        }
                      />
                    </div>
                    {choice.content !== null && (
                      <div>
                        <input
                          value={choice.content}
                          onChange={(e) =>
                            writeChoiceContent({ surveyIdx, questionIdx, choiceIdx, content: e.target.value })
                          }
                        />
                      </div>
                    )}
                    {choice.isDescriptive && (
                      <div>
                        {choice.descForm || 'descForm'}
                        <Button label='숫자' onClick={() => addNumberDescForm({ surveyIdx, questionIdx, choiceIdx })} />
                        <Button label='문자' onClick={() => addStringDescForm({ surveyIdx, questionIdx, choiceIdx })} />
                        <input value={staticDesc} onChange={onChangeStaticDesc} />
                        <Button
                          label='글자'
                          onClick={() => addStaticDescForm({ surveyIdx, questionIdx, choiceIdx, content: staticDesc })}
                        />
                        <Button label='지우기' onClick={() => eraseDescForm({ surveyIdx, questionIdx, choiceIdx })} />
                      </div>
                    )}
                    {survey.questionType !== QuestionTypes.shortAnswer && (
                      <Button
                        label='서술여부'
                        onClick={() => toggleChoiceIsDescriptive({ surveyIdx, questionIdx, choiceIdx })}
                      />
                    )}
                    <Button label='삭제' onClick={() => removeChoice({ surveyIdx, questionIdx, choiceIdx })} />
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
    </div>
  );
};

const Container = css`
  background-color: antiquewhite;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;
`;

const QuestionTypeLabel = css`
  width: fit-content;
  padding: 0.5rem 0.8rem;
  border-radius: 0.8rem;
  background-color: lightblue;
`;

const Table = css`
  display: grid;
  grid-template-columns: 1fr 1fr 3fr;

  > div {
    border: 0.1rem solid dimgray;

    :nth-of-type(3n) {
      display: flex;
      gap: 1rem;
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
  align-items: center;
  gap: 1rem;

  > div {
    display: flex;
    align-items: center;
  }
`;
