import { PersistentUnorderedMap } from "near-sdk-as";
import { getPaginationOffset, PaginationResult } from "../helper/pagination.helper";
import Event from "../model/event.model";

const eventPersit = new PersistentUnorderedMap<string, Event>("fE");
const userEventPersit = new PersistentUnorderedMap<string, string>("uEP");

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
        if (eventPersit.contains(id)) {
            eventPersit.delete(id);
        }
    }
}


export class UserEventStorage {
    static gets(id: string, page: i32): PaginationResult<Event> {
        if (userEventPersit.contains(id)) {
            const eventIdSerialize = userEventPersit.getSome(id);
            if (eventIdSerialize == "" || eventIdSerialize == null) {
                return new PaginationResult<Event>(1, 0, new Array<Event>(0));
            }

            const eventIds = eventIdSerialize.split(",");
            const eventSize = eventIds.length;
            const pagination_offset = getPaginationOffset(eventSize, page);
            const ret: Set<Event> = new Set<Event>();

            for (let i = pagination_offset.startIndex; i >= pagination_offset.endIndex; i--) {
                if (eventPersit.contains(eventIds[i])) {
                    const eventDetails = eventPersit.getSome(eventIds[i]);
                    ret.add(eventDetails);
                }
            }
            return new PaginationResult<Event>(page, eventSize, ret.values());
        }

        return new PaginationResult<Event>(1, 0, new Array<Event>(0));
    }

    static set(userId: string, eventId: string): void {
        if (userEventPersit.contains(userId)) {
            let eventIdSerialize = userEventPersit.getSome(userId);
            if (eventIdSerialize == "" || eventIdSerialize == null) {
                eventIdSerialize = "";
            }
            let eventIds = eventIdSerialize.split(",");
            const fIndex = eventIds.indexOf(eventId);
            if (fIndex == -1) {
                eventIds.push(eventId);
                eventIdSerialize = eventIds.join(",");
                userEventPersit.set(userId, eventIdSerialize);
            }
        } else {
            userEventPersit.set(userId, eventId);
        }
    }

    static count(userId: string): i32 {
        if (userEventPersit.contains(userId)) {
            const eventIdSerialize = userEventPersit.getSome(userId);
            if (eventIdSerialize == "" || eventIdSerialize == null) {
                return 0;
            }
            const eventIds = eventIdSerialize.split(",");
            const eventIdLengths = eventIds.length;
            let num = 0;
            for (let i = 0; i < eventIdLengths; i++) {
                if (eventIds[i] != "") {
                    num++;
                }
            }
            return num;
        }
        return 0;
    }

    static delete(userId: string, eventId: string): void {
        if (userEventPersit.contains(userId)) {
            let eventIdSerialize = userEventPersit.getSome(userId);

            if (eventIdSerialize == "" || eventIdSerialize == null) {
                eventIdSerialize = "";
            }
            let eventIds = eventIdSerialize.split(",");
            const dIndex = eventIds.indexOf(eventId);
            if (dIndex > -1) {
                eventIds.splice(dIndex, 1);
            }
            eventIdSerialize = eventIds.join(",");
            userEventPersit.set(userId, eventIdSerialize);
        }
    }
}

