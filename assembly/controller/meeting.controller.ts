import { Context, logging, u128 } from "near-sdk-as";
import { PaginationResult } from "../helper/pagination.helper";
import Meeting from "../model/meeting.model";
import { MeetingStorage, UserMeetingRequestStorage, UserPendingRequestStorage } from "../storage/meeting.storage";

export function get_meeting(id: string): Meeting | null {
    return MeetingStorage.get(id);
}

export function cancel_meeting_request(id: string): string | null {
    const meeting: Meeting | null = MeetingStorage.get(id);
    if (meeting && (Context.sender == meeting.get_requestor())) {
        MeetingStorage.delete(id);
        return id;
    }
    return null;
}

export function get_pending_requests(userId: string, page: i32):PaginationResult<Meeting> {
    return UserPendingRequestStorage.gets(userId, page);
}

export function get_pending_requests_count(userId: string): i32 {
    return UserPendingRequestStorage.count(userId);
}

export function get_meeting_requests(userId: string, page: i32):PaginationResult<Meeting> {
    return UserMeetingRequestStorage.gets(userId, page);
}

export function get_meeting_requests_count(userId: string): i32 {
    return UserMeetingRequestStorage.count(userId);
}