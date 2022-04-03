import { base58, Context, u128, util } from "near-sdk-as";
import { MeetingStorage } from "../storage/meeting.storage";

@nearBindgen
class Meeting {
    private id: string;
    private requestor: string;

    constructor(
        private receiver: string,
        private start_date: u64,
        private end_date: u64,
        private name: string,
        private email: string,
        private description: string
    ) {
        this.requestor = Context.sender;
        this.generate_id()
    }

    private generate_id(): void {
        let mrId: string = "";
        while (mrId == "") {
            const blockTime = "MR_" + Context.sender + this.receiver + Context.blockTimestamp.toString();
            const hBlockTime = base58.encode(util.stringToBytes(blockTime));
            if (!MeetingStorage.contains(hBlockTime)) {
                mrId = hBlockTime;
            }
        }
        this.id = mrId;
    }

    get_start_date(): u64 {
        return this.start_date;
    }

    get_end_date(): u64 {
        return this.end_date;
    }

    get_receiver(): string {
        return this.receiver;
    }

    get_requestor(): string {
        return this.requestor;
    }

    get_name(): string {
        return this.name;
    }

    get_email(): string {
        return this.email;
    }

    get_description(): string {
        return this.description;
    }

    get_id(): string {
        return this.id;
    }

    save(): void {
        MeetingStorage.set(this.id, this);
    }

}

export default Meeting;