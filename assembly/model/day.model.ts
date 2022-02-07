import { base58, Context, util } from "near-sdk-as";
import { DayStorage } from "../storage/calendar.storage";

@nearBindgen
class Day {
    public id: string;
    private events: Set<string>;
    private notes: Set<string>;

    constructor() {
        this.generate_id();
        if (this.events == null) {
            this.events = new Set<string>();
        }
        if (this.notes == null) {
            this.notes = new Set<string>();
        }
    }

    private generate_id(): void {
        let id: string = "";
        while (id == "") {
            const blockTime = Context.sender + (Context.blockTimestamp / 86400000000000).toString();
            const hBlockTime = base58.encode(util.stringToBytes(blockTime));
            if (!DayStorage.contains(hBlockTime)) {
                id = hBlockTime;
            }
        }
        this.id = id;
    }

    add_note(note_id: string): bool {
        if (!this.notes.has(note_id)) {
            this.notes.add(note_id);
            this.save();
            return true;
        }
        return false;
    }

    add_event(event_id: string): bool {
        if (!this.events.has(event_id)) {
            this.events.add(event_id);
            this.save();
            return true;
        }
        return false;
    }

    remove_note(note_id: string): bool {
        if (this.notes.has(note_id)) {
            this.notes.delete(note_id);
            this.save();
            return true;
        }
        return false;
    }

    remove_event(event_id: string): bool {
        if (this.events.has(event_id)) {
            this.events.delete(event_id);
            this.save();
            return true;
        }
        return false;
    }

    save(): void {
        DayStorage.set(this.id, this);
    }

}
export default Day;