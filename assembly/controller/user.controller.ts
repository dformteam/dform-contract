import { Context, logging } from "near-sdk-as";
import { EVENT_TYPE } from "../model/event.model";
import { FORM_TYPE } from "../model/form.model";
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

    return user.create_event(name, location, description, privacy, cover_image, event_type);
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

    return user.delete_event(formId);
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

export function get_user(userId: string): User | null {
    return UserStorage.get(userId);
}
