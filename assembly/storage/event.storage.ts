import { PersistentUnorderedMap } from "near-sdk-as";
import Event from "../model/event.model";

const eventPersit = new PersistentUnorderedMap<string, Event>("fE");

export class EventStorage {
    static get(id: string): Event | null {
        if (eventPersit.contains(id)) {
            return eventPersit.getSome(id);
        }
        return null;
    }

    static set(id: string, value: Event): void {
        eventPersit.set(id, value);
    }

    static gets(): Event[] {
        return eventPersit.values();
    }

    static contains(id: string): bool {
        return eventPersit.contains(id);
    }

    static delete(id: string): void {
        eventPersit.delete(id);
    }
}