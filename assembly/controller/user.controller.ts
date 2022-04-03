import { Context, logging, u128 } from "near-sdk-as";
import { EVENT_TYPE } from "../model/event.model";
import Event from "../model/event.model";
import { FORM_TYPE } from "../model/form.model";
import Meeting from "../model/meeting.model";
import UserDetailResponse from "../model/response/user_detail_response";
import User from "../model/user.model";
import { USER_STATUS } from "../model/user.model";
import { MeetingStorage } from "../storage/meeting.storage";
import { UserStorage } from "../storage/user.storage";

export function init_new_form(title: string, description: string, type: FORM_TYPE): string | null {
    const sender = Context.sender;
    if (title == "") {
        return null;
    }

    let user = UserStorage.get(sender);
    if (user == null) {
        user = new User();
    }

    const formId = user.create_form(title, description, type);
    user.save();

    return formId;
}

export function init_new_event(
    name: string,
    location: string,
    description: Set<string>,
    privacy: Set<string>,
    cover_image: string,
    event_type: EVENT_TYPE,
    start_date: u64,
    end_date: u64,
    url: string
): string | null {
    if (name == "") {
        return null;
    }

    const sender = Context.sender;

    let user = UserStorage.get(sender);
    if (user == null) {
        user = new User();
        user.save();
    }

    return user.create_event(name, location, description, privacy, cover_image, event_type, start_date, end_date, url);
}

export function get_recent_event_created(): string | null {
    const sender = Context.sender;
    let user = UserStorage.get(sender);
    if (!user) {
        return null;
    }
    return user.get_recent_event_created();

}

export function join_form(formId: string): bool {
    const sender = Context.sender;

    let user = UserStorage.get(sender);
    if (user == null) {
        user = new User();
        user.save();
    }

    return user.join_form(formId);
}

export function delete_form(formId: string): bool {
    const sender = Context.sender;

    let user = UserStorage.get(sender);
    if (user == null) {
        user = new User();
        user.save();
        return false;
    }

    return user.delete_form(formId);
}

export function join_event(eventId: string): bool {
    const sender = Context.sender;

    let user = UserStorage.get(sender);
    if (user == null) {
        user = new User();
        user.save();
    }

    return user.join_event(eventId);
}

export function delete_event(eventId: string): bool {
    const sender = Context.sender;

    let user = UserStorage.get(sender);
    if (user == null) {
        user = new User();
        user.save();
        return false;
    }

    return user.delete_event(eventId);
}

export function leave_event(eventId: string): bool {
    const sender = Context.sender;

    let user = UserStorage.get(sender);
    if (user == null) {
        user = new User();
        user.save();
        return false;
    }

    return user.leave_event(eventId);
}

export function get_user(userId: string): UserDetailResponse | null {
    let user = UserStorage.get(userId);
    if (user == null) {
        return new UserDetailResponse(userId, USER_STATUS.ACTIVE, u128.Zero, u128.Zero, 0, 0, 0, 0);
    }

    return new UserDetailResponse(
        userId,
        user.get_status(),
        user.get_income(),
        user.get_outcome(),
        user.get_form_owner_count(),
        user.get_event_owner_count(),
        user.get_form_joined_count(),
        user.get_event_joined_count(),
    );
}

export function request_a_meeting(
    receiver: string,
    start_date: u64,
    end_date: u64,
    name: string,
    email: string,
    description: string): string | null {

    const requestor = Context.sender;
    let receiverInfo = UserStorage.get(receiver);
    if (receiverInfo == null) {
        return null
    }

    let user = UserStorage.get(requestor);
    if (user == null) {
        user = new User();
        user.save();
    }

    return user.request_a_meeting(receiver, start_date, end_date, name, email, description);
}

export function response_meeting_request(meeting_id: string, approve: bool): string | null {
    let meetingInfo: Meeting | null = MeetingStorage.get(meeting_id);
    if (!meetingInfo) {
        return null
    }
    if (Context.sender != meetingInfo.get_receiver()) {
        return null;
    }
    let receiver = UserStorage.get(meetingInfo.get_receiver());
    let requestor = UserStorage.get(meetingInfo.get_requestor());
    if (!receiver || !requestor) {
        return null;
    }
    let meetingEvent: Event | null = receiver.response_meeting_request(meeting_id, approve);
    if (!meetingEvent) {
        return null;
    }
    let reqStt = requestor.join_meeting_event(meetingEvent.get_id())
    if (!reqStt) {
        return null;
    }
    return meetingEvent.get_id();
}
