// Libraries
import React from "react";

// Import Types
import { AnswerObject } from "../App";

// Styles
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

// Types
type Props = {
  question: string;
  answers: string[];
  currentQuestionNr: number;
  totalQuestionNr: number;
  userAnswer: AnswerObject | undefined;
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  currentQuestionNr,
  totalQuestionNr,
  userAnswer,
  callback,
}) => {
  return (
    <Wrapper>
      <p>
        Question: {currentQuestionNr + 1} / {totalQuestionNr}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer) => {
          return (
            <ButtonWrapper
              key={answer}
              isCorrect={userAnswer?.correctAnswer === answer}
              isUserClicked={userAnswer?.answer === answer}
            >
              <button
                disabled={userAnswer ? true : false}
                value={answer}
                onClick={callback}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
            </ButtonWrapper>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
