import { Context, logging } from "near-sdk-core";
import { u128 } from "near-sdk-as";
import { FormStorage } from "../storage/form.storage";
// import { FormQuestionStorage } from "../storage/question.storage";
// import { ParticipantAnswerIndexStorage } from "../storage/participant.storage";
import { ParticipantStatus } from "../helper/status.helper";
// import Question from "./question.model";
import { ParticipantDetailStorage } from "../storage/form.storage";

@nearBindgen
export class Participant {
    public lastSubmitTimestamp: u64;
    public cashSpent: u128 = u128.from(0);
    public submitTime: u32 = 0;
    public status: ParticipantStatus = ParticipantStatus.Active;
    constructor(public formId: string, public userId: string) {
        this.save()
    }

    updateStatus(status: ParticipantStatus): ParticipantStatus {
        this.status = status;
        this.save();
        return this.status;
    }

    join(): u64 {
        this.lastSubmitTimestamp = Context.blockTimestamp;
        this.submitTime = this.submitTime + 1;
        this.cashSpent = u128.add(this.cashSpent, Context.attachedDeposit);
        this.save();
        return this.lastSubmitTimestamp;
    }

    save(): void {
        ParticipantDetailStorage.set(`${this.formId}_${this.userId}`, this);
    }

}
