import { Context, logging } from "near-sdk-core";
import { u128 } from "near-sdk-as";
import { ParticipantStorage } from "../storage/participant.storage";

export enum ParticipantStatus {
    Banned,
    Active,
    Error,
}

@nearBindgen
export class Participant {
    private id: string;
    private status: ParticipantStatus = ParticipantStatus.Active;
    private forms: Set<string>;

    constructor() {
        this.id = Context.sender;
        this.save();
    }

    set_status(status: ParticipantStatus): void {
        this.status = status;
    }

    get_status(): ParticipantStatus {
        return this.status;
    }

    join_form(formId: string): void {
        this.forms.add(formId);
    }

    get_join_form_status(formId: string): bool {
        return this.forms.has(formId);
    }

    // join(): u64 {
    //     this.lastSubmitTimestamp = Context.blockTimestamp;
    //     this.submitTimes = this.submitTimes + 1;
    //     this.cashSpent = u128.add(this.cashSpent, Context.attachedDeposit);
    //     this.save();
    //     return this.lastSubmitTimestamp;
    // }

    save(): void {
        ParticipantStorage.set(this.id, this);
    }
}
