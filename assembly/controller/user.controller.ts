import { Context, logging } from "near-sdk-as";
import { PAGE_SIZE, PaginationResult } from "../helper/pagination.helper";
import { EVENT_TYPE } from "../model/event.model";
import Event from "../model/event.model";
import { FORM_TYPE } from "../model/form.model";
import UserDetailResponse from "../model/response/user_detail_response";
import User from "../model/user.model";
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

    return user.create_event(name, location, description, privacy, cover_image, event_type, start_date, end_date);
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
    const user = UserStorage.get(userId);
    if (user == null) {
        return null;
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

export function get_owned_events(userId: string, page: i32): PaginationResult<Event> | null {
    const user = UserStorage.get(userId);
    if (user == null) {
        return null;
    }
    return user.get_owned_events(page);
}

export function get_particippated_events(userId: string, page: i32): PaginationResult<Event> | null {
    const user = UserStorage.get(userId);
    if (user == null) {
        return null;
    }
    return user.get_participated_events(page);
}