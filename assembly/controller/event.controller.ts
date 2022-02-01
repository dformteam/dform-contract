import { Context, u128 } from "near-sdk-core";
import Event from "../model/event.model";
import { EventStorage } from "../storage/event.storage";

export function get_event(event_id: string): Event | null {
    return EventStorage.get(event_id);
}

export function update_event_info(event_id: string, title: string, description: Set<string>, location: string, cover_img: string): Event | null {
    const event = EventStorage.get(event_id);
    if (event == null) {
        return null;
    }

    event.set_name(title).set_description(description).set_location(location).set_cover_img(cover_img).save();

    return event;
}

export function get_enroll_fee(event_id: string): u128 | null {
    const event = EventStorage.get(event_id);
    if (event == null) {
        return null;
    }

    return event.get_enroll_fee();
}

export function get_participants_count(event_id: string): i32 {
    const event = EventStorage.get(event_id);
    if (event == null) {
        return 0;
    }

    return event.get_number_of_participants();
}

export function get_interests_count(event_id: string): i32 {
    const event = EventStorage.get(event_id);
    if (event == null) {
        return 0;
    }
    return event.get_number_of_interests();
}

export function delete_event(id: string): bool {
    const sender = Context.sender;
    const existedEvent = EventStorage.get(id);

    if (existedEvent == null || existedEvent.get_owner() != sender) {
        return false;
    }

    existedEvent.remove();
    return true;
}

export function interest_event(event_id: string): bool {
    const event = EventStorage.get(event_id);
    if (event == null) {
        return false;
    }
    return event.interest();
}

export function not_interest_event(event_id: string): bool {
    const event = EventStorage.get(event_id);

    if (event == null) {
        return false;
    }

    return event.not_interest();
}

export function publish_event(
    eventId: string,
    limit_participants: i32,
    enroll_fee: u128,
    start_date: u64,
    end_date: u64,
    black_list: Set<string>,
    white_list: Set<string>,
): bool {
    const existedEvent = EventStorage.get(eventId);
    if (existedEvent == null) {
        return false;
    }
    return existedEvent.publish(limit_participants, enroll_fee, start_date, end_date, black_list, white_list);
}

export function unpublish_event(eventId: string): bool {
    const existedEvent = EventStorage.get(eventId);
    const sender = Context.sender;
    if (existedEvent == null || existedEvent.get_owner() != sender) {
        return false;
    }

    return existedEvent.unpublish();
}
