import { Answer } from "./answer";
import { QuestionType } from "./question-type";

export interface Question {
    id: number;
    text: string;
    type: QuestionType;
    sortOrder: number;
    answers: Answer[];
}