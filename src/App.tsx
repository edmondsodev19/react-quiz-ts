// Libraries
import React, { useState } from "react";

// API
import { fetchQuizQuestions } from "./API";

// Types
import { Difficulty } from "./API";
import { QuestionState } from "./API";

// Components
import QuestionCard from "./components/QuestionCard";

// Styles
import { GlobalStyle, Wrapper } from "./App.styles";

// Constants
const TOTAL_QUESTION_NR = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  isCorrect: boolean;
  correctAnswer: string;
};

const App = () => {
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [currentQuestionNr, setCurrentQuestionNr] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isInited, setIsInited] = useState(false);

  //#region //Variables

  const currentQuestion = questions[currentQuestionNr];
  const isLastQuestion = currentQuestionNr === TOTAL_QUESTION_NR - 1;

  //#endregion

  //#region //Functions
  const startTrivia = async () => {
    setIsLoading(true);
    const questionArr = await fetchQuizQuestions(
      TOTAL_QUESTION_NR,
      Difficulty.EASY
    );
    setQuestions(questionArr);
    setIsLoading(false);
    setIsInited(true);
  };

  const onClickAnswerBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    const userAnswer = e.currentTarget.value;
    const userAnswerObj = {
      question: currentQuestion.question,
      answer: e.currentTarget.value,
      isCorrect: currentQuestion.correct_answer === e.currentTarget.value,
      correctAnswer: currentQuestion.correct_answer,
    };
    if (userAnswer === currentQuestion.correct_answer) {
      setScore((prev) => prev + 1);
    }
    setUserAnswers((prev) => [...prev, userAnswerObj]);
  };

  const onClickNextQuestionBtn = () => {
    if (!isLastQuestion) {
      setCurrentQuestionNr((prev) => prev + 1);
    }
  };

  const restartTrivia = () => {
    setQuestions([]);
    setCurrentQuestionNr(0);
    setScore(0);
    setUserAnswers([]);
    setIsInited(false);
  };

  //#endregion

  //#region //Components

  const StartTriviaBtn = () => (
    <button className={"start"} onClick={startTrivia}>
      Start Trivia
    </button>
  );

  const NextQuestionBtn = () => (
    <button className={"next"} onClick={onClickNextQuestionBtn}>
      Next Question
    </button>
  );

  const RestartBtn = () => (
    <button className={"start"} onClick={restartTrivia}>
      Restart Trivia
    </button>
  );

  //#endregion

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Quiz</h1>
        {isLoading && <div>Loading...</div>}

        {!isInited && !isLoading && <StartTriviaBtn />}

        {isInited && <h4>{`Score: ${score}`}</h4>}

        {currentQuestion && (
          <QuestionCard
            currentQuestionNr={currentQuestionNr}
            totalQuestionNr={TOTAL_QUESTION_NR}
            question={currentQuestion?.question}
            answers={currentQuestion?.answers}
            userAnswer={
              userAnswers ? userAnswers[currentQuestionNr] : undefined
            }
            callback={onClickAnswerBtn}
          />
        )}
        {/* Next Question Btn */}
        {!isLastQuestion && userAnswers[currentQuestionNr] && (
          <NextQuestionBtn />
        )}

        {/* Try again Btn */}
        {isLastQuestion && userAnswers[currentQuestionNr] && <RestartBtn />}
      </Wrapper>
    </>
  );
};

export default App;
