import { Context, u128 } from "near-sdk-core";
import { PaginationResult } from "../helper/pagination.helper";
import Form from "../model/form.model";
import { FORM_TYPE } from "../model/form.model";
import { FormStatusResponse } from "../model/response/form_status";
import { FormStorage, UserFormStorage } from "../storage/form.storage";
import { ContractPromiseBatch, logging } from "near-sdk-as";
import Event, { EVENT_TYPE } from "../model/event.model";
import { EventStorage } from "../storage/event.storage";

const CREATE_EVENT_COST = "10000000000000000000"; // 1 NEAR

export function init_new_event(title: string, description: string, type: EVENT_TYPE, location: string, cover_img: string): string | null {
    if (title == "") {
        return null;
    }
    if (u128.lt(Context.attachedDeposit, u128.from(CREATE_EVENT_COST))) {
        return null;
    }
    const newEvent = new Event(title, description, type, location, cover_img);
    newEvent.save_event();
    return newEvent.get_id();
}

export function get_register_form_id(event_id: string): string | null {
    return EventStorage.contains(event_id) ? event_id : null;
}

export function get_event(event_id: string): Event | null {
    return EventStorage.get(event_id);
}

export function update_event_info(event_id: string, title: string = '', description: string = '', location: string = '', cover_img: string = ''): Event | null {
    const event: Event | null = EventStorage.get(event_id);
    if (!event) return null;
    if (title !== '') event.set_title(title);
    if (description !== '') event.set_description(description);
    if (location !== '') event.update_location(location);
    if (cover_img !== '') event.update_cover_image(cover_img);
    event.save_event();
    return event;
}

export function update_event_type(event_id: string, event_type: EVENT_TYPE): EVENT_TYPE | null {
    const event: Event | null = EventStorage.get(event_id);
    if (!event) return null;
    event.update_event_type(event_type)
    return event_type;
}

export function set_participant_fee(eventId: string, new_fee: u128): u128 | null {
    const form = FormStorage.get(eventId);
    const sender = Context.sender;
    if (form && (sender == form.get_owner())) {
        return form.set_enroll_fee(new_fee);
    }
    return null;
}

export function get_participant_fee(eventId: string): u128 | null {
    const form = FormStorage.get(eventId);
    if (form) {
        return form.get_enroll_fee();
    }
    return null;
}

export function delete_event(id: string): bool {
    const sender = Context.sender;
    const existedEvent = EventStorage.get(id);
    if (existedEvent == null || existedEvent.get_owner() != sender) {
        return false;
    }
    existedEvent.remove();
    const existedForm = FormStorage.get(id);
    if (existedForm == null || existedForm.get_owner() != sender) {
        return false;
    }
    existedForm.remove();
    return true;
}