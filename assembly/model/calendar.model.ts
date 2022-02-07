import { Context } from "near-sdk-as";
import { CalendarStorage } from "../storage/calendar.storage";

@nearBindgen
class Calendar {
    private id: string;
    private created_at: u64;
    private days: Set<string>;

    constructor() {
        this.created_at = Context.blockTimestamp / 1000000;
        this.id = Context.sender;
        if (this.days == null) {
            this.days = new Set<string>();
        }
    }

    add_a_day(day_id: string): bool {
        if (!this.days.has(day_id)) {
            this.days.add(day_id);
            this.save();
            return true;
        }
        return false;
    }

    remove_a_day(day_id: string): bool {
        if (this.days.has(day_id)) {
            this.days.delete(day_id);
            this.save();
            return true;
        }
        return false;
    }

    save(): void {
        CalendarStorage.set(this.id, this);
    }
}

export default Calendar;
