import { Context } from "near-sdk-core";
import { QuestionType } from "./question.model";

@nearBindgen
export class UserAnswer {
    private participantId: string;
    constructor(private question_id: string, private title: string, private type: QuestionType, private answer: string, private submit_time: u64) {
        this.participantId = Context.sender;
    }
}

@nearBindgen
class Answer {
    private owner: string;
    private submit_time: u64;
    constructor(private formId: string, private questionId: string, private ans: string) {
        this.owner = Context.sender;
        this.submit_time = Context.blockTimestamp;
    }

    get_answer(): string {
        return this.ans;
    }

    get_submit_time(): u64 {
        return this.submit_time;
    }
}

export default Answer;
