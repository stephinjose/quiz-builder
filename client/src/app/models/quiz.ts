import { Question } from "./question";

export interface Quiz {
    id: number;
    title: string;
    permalink: string;
    questions: Question[];
}