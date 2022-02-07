import { base58, Context, util } from "near-sdk-as";
import { NoteStorage } from "../storage/calendar.storage";

export enum NOTE_STATUS {
    TODO,
    INPROGRESS,
    COMPLETE
}

@nearBindgen
class Note {
    public id: string;
    private created_at: u64;
    private status: NOTE_STATUS;
    constructor(private content: string, private reminder_time: u64 = 0) {
        this.status = NOTE_STATUS.TODO;
        this.generate_id();
        this.created_at = Context.blockTimestamp / 1000000
    }

    private generate_id(): void {
        let id: string = "";
        while (id == "") {
            const blockTime = Context.sender + (Context.blockTimestamp / 1000000).toString();
            const hBlockTime = base58.encode(util.stringToBytes(blockTime));
            if (!NoteStorage.contains(hBlockTime)) {
                id = hBlockTime;
            }
        }
        this.id = id;
    }

    update_reminder_time(new_time: u64): bool {
        if (new_time != this.reminder_time) {
            this.reminder_time = new_time;
            this.save();
            return true;
        }
        return false;
    }

    update_status(new_status: NOTE_STATUS): bool {
        if (new_status != this.status) {
            this.status = new_status;
            this.save();
            return true;
        }
        return false;
    }

    update_content(new_content: string): bool {
        if (new_content != this.content) {
            this.content = new_content;
            this.save();
            return true;
        }
        return false;
    }

    save(): void {
        NoteStorage.set(this.id, this);
    }
}
export default Note;