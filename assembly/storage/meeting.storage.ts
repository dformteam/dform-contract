import { logging, PersistentUnorderedMap, PersistentVector } from "near-sdk-as";
import { getPaginationOffset, PaginationResult } from "../helper/pagination.helper";
import Meeting from "../model/meeting.model";

const meetingPersit = new PersistentUnorderedMap<string, Meeting>("mP");
const userMeetingRequestPersit = new PersistentUnorderedMap<string, string>("uMRP");
const userPendingRequestPersit = new PersistentUnorderedMap<string, string>("uPRP");

export class MeetingStorage {
    static get(id: string): Meeting | null {
        if (meetingPersit.contains(id)) {
            return meetingPersit.getSome(id);
        }
        return null;
    }

    static set(id: string, value: Meeting): void {
        meetingPersit.set(id, value);
    }

    static gets(): Meeting[] {
        return meetingPersit.values();
    }

    static contains(id: string): bool {
        return meetingPersit.contains(id);
    }

    static delete(id: string): void {
        if (meetingPersit.contains(id)) {
            meetingPersit.delete(id);
        }
    }
}

export class UserMeetingRequestStorage {
    static gets(id: string, page: i32): PaginationResult<Meeting> {
        if (userMeetingRequestPersit.contains(id)) {
            const meetingIdSerialize = userMeetingRequestPersit.getSome(id);
            if (meetingIdSerialize == "" || meetingIdSerialize == null) {
                return new PaginationResult<Meeting>(1, 0, new Array<Meeting>(0));
            }

            const meetingIds = meetingIdSerialize.split(",");
            const meetingSize = meetingIds.length;
            const pagination_offset = getPaginationOffset(meetingSize, page);
            const ret: Set<Meeting> = new Set<Meeting>();

            for (let i = pagination_offset.startIndex; i >= pagination_offset.endIndex; i--) {
                if (meetingPersit.contains(meetingIds[i])) {
                    const meetingDetails = meetingPersit.getSome(meetingIds[i]);
                    ret.add(meetingDetails);
                }
            }
            return new PaginationResult<Meeting>(page, meetingSize, ret.values());
        }

        return new PaginationResult<Meeting>(1, 0, new Array<Meeting>(0));
    }

    static set(userId: string, meetingId: string): void {
        if (userMeetingRequestPersit.contains(userId)) {
            let meetingIdSerialize = userMeetingRequestPersit.getSome(userId);
            if (meetingIdSerialize == "" || meetingIdSerialize == null) {
                meetingIdSerialize = "";
            }
            let meetingIds = meetingIdSerialize.split(",");
            const fIndex = meetingIds.indexOf(meetingId);
            if (fIndex == -1) {
                meetingIds.push(meetingId);
                meetingIdSerialize = meetingIds.join(",");
                userMeetingRequestPersit.set(userId, meetingIdSerialize);
            }
        } else {
            userMeetingRequestPersit.set(userId, meetingId);
        }
    }

    static count(userId: string): i32 {
        if (userMeetingRequestPersit.contains(userId)) {
            const meetingIdSerialize = userMeetingRequestPersit.getSome(userId);
            if (meetingIdSerialize == "" || meetingIdSerialize == null) {
                return 0;
            }
            const meetingIds = meetingIdSerialize.split(",");
            const meetingIdLengths = meetingIds.length;
            let num = 0;
            for (let i = 0; i < meetingIdLengths; i++) {
                if (meetingIds[i] != "") {
                    num++;
                }
            }
            return num;
        }
        return 0;
    }

    static delete(userId: string, meetingId: string): void {
        if (userMeetingRequestPersit.contains(userId)) {
            let meetingIdSerialize = userMeetingRequestPersit.getSome(userId);

            if (meetingIdSerialize == "" || meetingIdSerialize == null) {
                meetingIdSerialize = "";
            }
            let meetingIds = meetingIdSerialize.split(",");
            const dIndex = meetingIds.indexOf(meetingId);
            if (dIndex > -1) {
                meetingIds.splice(dIndex, 1);
            }
            meetingIdSerialize = meetingIds.join(",");
            userMeetingRequestPersit.set(userId, meetingIdSerialize);
        }
    }
}


export class UserPendingRequestStorage {
    static gets(id: string, page: i32): PaginationResult<Meeting> {
        if (userPendingRequestPersit.contains(id)) {
            const meetingIdSerialize = userPendingRequestPersit.getSome(id);
            if (meetingIdSerialize == "" || meetingIdSerialize == null) {
                return new PaginationResult<Meeting>(1, 0, new Array<Meeting>(0));
            }

            const meetingIds = meetingIdSerialize.split(",");
            const meetingSize = meetingIds.length;
            const pagination_offset = getPaginationOffset(meetingSize, page);
            const ret: Set<Meeting> = new Set<Meeting>();

            for (let i = pagination_offset.startIndex; i >= pagination_offset.endIndex; i--) {
                if (meetingPersit.contains(meetingIds[i])) {
                    const meetingDetails = meetingPersit.getSome(meetingIds[i]);
                    ret.add(meetingDetails);
                }
            }
            return new PaginationResult<Meeting>(page, meetingSize, ret.values());
        }

        return new PaginationResult<Meeting>(1, 0, new Array<Meeting>(0));
    }

    static set(userId: string, meetingId: string): void {
        if (userPendingRequestPersit.contains(userId)) {
            let meetingIdSerialize = userPendingRequestPersit.getSome(userId);
            if (meetingIdSerialize == "" || meetingIdSerialize == null) {
                meetingIdSerialize = "";
            }
            let meetingIds = meetingIdSerialize.split(",");
            const fIndex = meetingIds.indexOf(meetingId);
            if (fIndex == -1) {
                meetingIds.push(meetingId);
                meetingIdSerialize = meetingIds.join(",");
                userPendingRequestPersit.set(userId, meetingIdSerialize);
            }
        } else {
            userPendingRequestPersit.set(userId, meetingId);
        }
    }

    static count(userId: string): i32 {
        if (userPendingRequestPersit.contains(userId)) {
            const meetingIdSerialize = userPendingRequestPersit.getSome(userId);
            if (meetingIdSerialize == "" || meetingIdSerialize == null) {
                return 0;
            }
            const meetingIds = meetingIdSerialize.split(",");
            const meetingIdLengths = meetingIds.length;
            let num = 0;
            for (let i = 0; i < meetingIdLengths; i++) {
                if (meetingIds[i] != "") {
                    num++;
                }
            }
            return num;
        }
        return 0;
    }

    static delete(userId: string, meetingId: string): void {
        if (userPendingRequestPersit.contains(userId)) {
            let meetingIdSerialize = userPendingRequestPersit.getSome(userId);

            if (meetingIdSerialize == "" || meetingIdSerialize == null) {
                meetingIdSerialize = "";
            }
            let meetingIds = meetingIdSerialize.split(",");
            const dIndex = meetingIds.indexOf(meetingId);
            if (dIndex > -1) {
                meetingIds.splice(dIndex, 1);
            }
            meetingIdSerialize = meetingIds.join(",");
            userPendingRequestPersit.set(userId, meetingIdSerialize);
        }
    }
}
