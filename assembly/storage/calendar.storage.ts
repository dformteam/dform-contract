import { PersistentUnorderedMap } from "near-sdk-as";
// import { getPaginationOffset, PaginationResult } from "../helper/pagination.helper";
import Calendar from "../model/calendar.model";
import Day from "../model/day.model";
import Note from "../model/note.model";

const calendarPersit = new PersistentUnorderedMap<string, Calendar>("caP");
const dayPersit = new PersistentUnorderedMap<string, Day>("daP");
const notePersit = new PersistentUnorderedMap<string, Note>("noP");

export class CalendarStorage {
    static get(id: string): Calendar | null {
        if (calendarPersit.contains(id)) {
            return calendarPersit.getSome(id);
        }
        return null;
    }

    static set(id: string, value: Calendar): void {
        calendarPersit.set(id, value);
    }

    static gets(): Calendar[] {
        return calendarPersit.values();
    }

    static contains(id: string): bool {
        return calendarPersit.contains(id);
    }

    static delete(id: string): void {
        if (calendarPersit.contains(id)) {
            calendarPersit.delete(id);
        }
    }
}

export class NoteStorage {
    static get(id: string): Note | null {
        if (notePersit.contains(id)) {
            return notePersit.getSome(id);
        }
        return null;
    }

    static set(id: string, value: Note): void {
        notePersit.set(id, value);
    }

    static gets(): Note[] {
        return notePersit.values();
    }

    static contains(id: string): bool {
        return notePersit.contains(id);
    }

    static delete(id: string): void {
        if (notePersit.contains(id)) {
            notePersit.delete(id);
        }
    }
}

export class DayStorage {
    static get(id: string): Day | null {
        if (dayPersit.contains(id)) {
            return dayPersit.getSome(id);
        }
        return null;
    }

    static set(id: string, value: Day): void {
        dayPersit.set(id, value);
    }

    static gets(): Day[] {
        return dayPersit.values();
    }

    static contains(id: string): bool {
        return dayPersit.contains(id);
    }

    static delete(id: string): void {
        if (dayPersit.contains(id)) {
            dayPersit.delete(id);
        }
    }
}
