import { Answer } from "./answer";
import { QuestionType } from "./question-type";

export interface Question {
    text: string;
    type: QuestionType;
    answers: Answer[];
}