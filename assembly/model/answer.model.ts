import { Context } from "near-sdk-core";
import { AnswerStorage } from "../storage/answer.storage";
import { ParticipantFormStorage } from "../storage/form.storage";
import { QuestionType } from "./question.model";

@nearBindgen
export class UserAnswer {
    private participantId: string;
    private answers: Map<string, Answer>;
    constructor(question_id: string, title: string, type: QuestionType, answer: string) {
        this.participantId = Context.sender;
    }

    setAnswer(formId: string, questionId: string, answer: string): void {
        const answ = new Answer(formId, questionId, answer);
        this.answers.set(questionId, answ);
    }

    getAnswer(): void {}
}

@nearBindgen
class Answer {
    private owner: string;
    private submitTime: u64;
    constructor(private formId: string, private questionId: string, private ans: string) {
        this.owner = Context.sender;
        this.submitTime = Context.blockTimestamp;
    }

    save(): void {
        ParticipantFormStorage.set(this.owner, this.formId);
        AnswerStorage.set(this.formId, this.owner, this.questionId, this.ans);
    }
}

export default Answer;
