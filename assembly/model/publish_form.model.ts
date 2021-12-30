import { u128 } from "near-sdk-as";

class PublishForm {
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

    public save(): void {}
}

export default PublishForm;
