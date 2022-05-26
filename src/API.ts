// Utils
import { shuffleArray } from './utils'

// Types
export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}

export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
};

export type QuestionState = Question & { answers: string[]; }

//#region 
export const fetchQuizQuestions = async (
    amount: number,
    difficulty: Difficulty
) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
    const resp = await fetch(endpoint);
    const data = await resp.json();

    const newQuestions = data.results.map((question: Question) => {
        return {
            ...question,
            answers: shuffleArray([question.correct_answer, ...question.incorrect_answers])
        }
    })
    return newQuestions;
}

//#endregion