import { css } from '@emotion/react';
import { useSetAtom } from 'jotai';
import { Fragment } from 'react';
import { Button } from './Button';
import {
  writeSurveyTitleAtom,
  writeSurveyDescriptionAtom,
  removeChoiceAtom,
  addChoiceAtom,
  writeChoiceContentAtom,
  writeQuestionContentAtom,
  writeQuestionNumberAtom,
  writeChoiceNumberAtom,
  addQuestionAtom,
  addCommonChoiceAtom,
  removeQuestionAtom,
  writeCommonChoiceContentAtom,
  removeCommonChoiceAtom,
  writeCommonChoiceNumberAtom,
  addNumberDescFormAtom,
  addStringDescFormAtom,
  addStaticDescFormAtom,
  eraseDescFormAtom,
} from '@atoms';
import { QuestionTypeCategories, QuestionTypeLables, QuestionTypes } from '@constants';
import { useInput } from '@hooks/useInput';
import { Fonts } from '@styles';

export const SurveyBox = ({ survey, surveyIdx }: SurveyBoxProps) => {
  const [staticDesc, onChangeStaticDesc, onResetStaticDesc] = useInput();
  const questionType = survey.questionType as ValueOf<typeof QuestionTypes>;
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
  return (
    <div css={Container}>
      <div css={QuestionTypeLabel}>{QuestionTypeLables[questionType]}</div>
      <div css={Box}>
        <div css={Meta}>
          <input //
            value={survey.title}
            onChange={(e) => writeTitle({ surveyIdx, title: e.target.value })}
            placeholder='제목'
          />
        </div>
        <div css={Meta}>
          <input
            value={survey.description}
            onChange={(e) => writeDescription({ surveyIdx, description: e.target.value })}
            placeholder='설명'
          />
        </div>
        <div css={Grids}>
          <div css={ContentsGrid}>
            <div>번호</div>
            <div>항목</div>
            {survey.questions.map((question, questionIdx) => (
              <Fragment key={questionIdx}>
                <div>
                  <input
                    value={question.number}
                    onChange={(e) => writeQuestionNumber({ surveyIdx, questionIdx, number: +e.target.value })}
                  />
                  <Button label='질문 삭제' onClick={() => removeQuestion({ surveyIdx, questionIdx })} />
                </div>
                <div>
                  <input
                    value={question.content}
                    onChange={(e) => writeQuestionContent({ surveyIdx, questionIdx, content: e.target.value })}
                  />
                </div>
              </Fragment>
            ))}
          </div>
          <div css={[ChoicesGrid, { gridTemplateColumns: `repeat(${survey.commonChoices?.length}, 1fr)` }]}>
            {QuestionTypeCategories.needCommonChoice.includes(questionType as any) && (
              <div css={AddCommonStandard}>
                <Button label='기준 추가' onClick={() => addCommonChoice({ surveyIdx, questionType })} />
              </div>
            )}
            {survey.commonChoices &&
              survey.commonChoices?.map((commonChoice, choiceIdx) => (
                <div key={choiceIdx}>
                  {commonChoice.content !== null && (
                    <input
                      value={commonChoice.content}
                      onChange={(e) => writeCommonChoiceContent({ surveyIdx, choiceIdx, content: e.target.value })}
                    />
                  )}
                  <Button label='삭제' onClick={() => removeCommonChoice({ surveyIdx, choiceIdx })} />
                </div>
              ))}
            {!survey.commonChoices && <div css={StandardLabel}>응답기준</div>}
            {survey.commonChoices &&
              survey.commonChoices?.map((commonChoice, choiceIdx) => (
                <div key={choiceIdx}>
                  <input
                    value={commonChoice.number}
                    onChange={(e) => writeCommonChoiceNumber({ surveyIdx, choiceIdx, number: +e.target.value })}
                  />
                </div>
              ))}
            {!survey.commonChoices &&
              survey.questions?.map((question, questionIdx) => (
                <div css={Choices} key={questionIdx}>
                  {question.choices?.map((choice, choiceIdx) => (
                    <div key={choiceIdx}>
                      <input
                        value={choice.number}
                        onChange={(e) =>
                          writeChoiceNumber({ surveyIdx, questionIdx, choiceIdx, number: +e.target.value })
                        }
                      />{' '}
                      {choice.content !== null && (
                        <input
                          value={choice.content}
                          onChange={(e) =>
                            writeChoiceContent({ surveyIdx, questionIdx, choiceIdx, content: e.target.value })
                          }
                        />
                      )}
                      {choice.isDescriptive && choice.descForm}
                      {choice.isDescriptive && (
                        <>
                          <Button
                            label='숫자'
                            onClick={() => addNumberDescForm({ surveyIdx, questionIdx, choiceIdx })}
                          />
                          <Button
                            label='문자'
                            onClick={() => addStringDescForm({ surveyIdx, questionIdx, choiceIdx })}
                          />
                          <input value={staticDesc} onChange={onChangeStaticDesc} />
                          <Button
                            label='글자'
                            onClick={() => {
                              {
                                addStaticDescForm({ surveyIdx, questionIdx, choiceIdx, content: staticDesc });
                                onResetStaticDesc();
                              }
                            }}
                          />
                          <Button label='지우기' onClick={() => eraseDescForm({ surveyIdx, questionIdx, choiceIdx })} />
                        </>
                      )}
                      <Button label='삭제' onClick={() => removeChoice({ surveyIdx, questionIdx, choiceIdx })} />
                    </div>
                  ))}
                  <Button label='추가' onClick={() => addChoice({ surveyIdx, questionIdx, questionType })} />
                </div>
              ))}
          </div>
        </div>
      </div>
      <Button label='질문 추가' onClick={() => addQuestion({ surveyIdx, questionType })} />
    </div>
  );
};

const Container = css`
  margin: 1rem 0;
`;

const Box = css`
  border: 0.1rem solid black;
  border-right: 0;
  border-bottom: 0;
  min-width: 60rem;
`;

const Meta = css`
  padding: 1rem;
  border-right: 0.1rem solid black;
  border-bottom: 0.1rem solid black;
`;

const Grids = css`
  display: flex;

  > div > div {
    /* height: 4rem; */
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
  }
`;

const ContentsGrid = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;

  > div {
    border-right: 0.1rem solid black;
    border-bottom: 0.1rem solid black;
    padding: 0.5rem;
  }
`;

const ChoicesGrid = css`
  display: grid;
  text-align: center;
  flex-grow: 1;
  position: relative;

  > div {
    padding: 0.5rem;
    border-right: 0.1rem solid black;
    border-bottom: 0.1rem solid black;
  }

  input {
    width: 8rem;
  }
`;

const Choices = css`
  display: flex;
  gap: 5rem;

  > div {
    display: flex;
    gap: 1rem;
  }

  input {
    width: 5rem;
  }
`;

const QuestionTypeLabel = css`
  ${Fonts.medium14}
  background-color: gray;
  color: white;
  width: fit-content;
  padding: 0.5rem 0.8rem;
  border-radius: 0.8rem;
  margin: 0.5rem 0;
`;

const StandardLabel = css`
  grid-column: 1;
`;

const AddCommonStandard = css`
  position: absolute;
  right: 0;
  transform: translateX(100%);
  border: 0 !important;
`;
