import { u128 } from "near-sdk-as";
import { UserAnswer } from "./answer.model";

class PublishForm {
    private totalParticipants: u32 = 0;
    private answers: Map<string, UserAnswer>;

    constructor(private id: string, private limit_participants: u32, private enroll_fee: u128, private start_date: u64, private end_date: u64) {
        this.enroll_fee = u128.Zero;
    }

    public get_id(): string {
        return this.id;
    }

    public get_limit_participant(): u32 {
        return this.limit_participants;
    }

    public get_enroll_fee(): u128 {
        return this.enroll_fee;
    }

    public get_start_date(): u64 {
        return this.start_date;
    }

    public get_end_date(): u64 {
        return this.end_date;
    }

    public setAnswers(): void {
        
    }

    public getAnswers(userId: string): UserAnswer[] {

        return this.answers.values();
        // const apId = `${userId}_${formId}`;
        // if (answerFormPersist.contains(apId)) {
        //     const anwStringify = answerFormPersist.getSome(apId);
        //     logging.log(anwStringify);
        //     const anws = anwStringify.split(";;;");
        //     const anws_length = anws.length;
        //     const ret: Set<UserAnswer> = new Set<UserAnswer>();
        //     for (let i = 0; i < anws_length; i++) {
        //         const anw = anws[i].split(":::");
        //         if (anw.length == 2) {
        //             const question_id = anw[0];
        //             const question_detail = QuestionStorage.get(question_id);
        //             if (question_detail == null) {
        //                 continue;
        //             }
        //             const answer = anw[1];
        //             ret.add(new UserAnswer(question_id, question_detail.getTitle(), question_detail.getType(), answer));
        //         }
        //     }
        //     return ret.values();
        // }
        // return new Array<UserAnswer>(0);
    }

    public setAnswer(): void {}

    public save(): void {}
}

export default PublishForm;
