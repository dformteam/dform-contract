import { Context, u128 } from "near-sdk-core";
import { PaginationResult } from "../helper/pagination.helper";
import Form from "../model/form.model";
import { FORM_TYPE } from "../model/form.model";
import { FormStatusResponse } from "../model/response/form_status";
import { FormStorage, UserFormStorage } from "../storage/form.storage";
import { ContractPromiseBatch, logging } from "near-sdk-as";
import { AVAILABLE_TYPE } from "../model/event.model";
import Event from "../model/event.model";
import { EVENT_TYPE } from "../model/event.model";
import { EventStorage } from "../storage/event.storage";

const CREATE_EVENT_COST = "10000000000000000000"; // 1 NEAR
const JOIN_EVENT_COST = "100000000000000000"; // 0.01 NEAR

export function init_new_event(
    name: string,
    event_type: EVENT_TYPE,
    available_type: AVAILABLE_TYPE,
    participant_fee: u128
): string | null {
    if (name == "") {
        return null;
    }
    if (u128.lt(Context.attachedDeposit, u128.from(CREATE_EVENT_COST))) {
        return null;
    }
    const newEvent = new Event(name, event_type, available_type, participant_fee);
    newEvent.save();
    return newEvent.id;
}

export function get_invitation_code(event_id: string): string | null {
    const event: Event | null = EventStorage.get(event_id);
    if (!event) return null;
    return event.get_invitation_code();
}

export function get_event(event_id: string): Event | null {
    return EventStorage.get(event_id);
}

export function update_event_info(
    event_id: string,
    title: string = '',
    description: string = '',
    location: string = '',
    cover_img: string = '',
    start_date: u64 = 0,
    end_date: u64 = 0
): bool {
    const event: Event | null = EventStorage.get(event_id);
    if (!event) return false;
    return event.update_event_info(title, description, location, cover_img, start_date, end_date);
}

export function set_participant_fee(event_id: string, new_fee: u128): u128 | null {
    const event: Event | null = EventStorage.get(event_id);
    if (!event) return null;
    if (Context.sender != event.owner) return null;
    return event.update_participant_fee(new_fee);
}

export function get_participant_fee(event_id: string): u128 | null {
    const event: Event | null = EventStorage.get(event_id);
    if (!event) return null;
    return event.get_participant_fee();
}

export function get_num_of_participants(event_id: string): i32 {
    const event: Event | null = EventStorage.get(event_id);
    if (!event) return -1;
    return event.get_number_of_participants();
}

export function get_num_of_interests(event_id: string): i32 {
    const event: Event | null = EventStorage.get(event_id);
    if (!event) return -1;
    return event.get_number_of_interests();
}

export function delete_event(id: string): bool {
    const sender = Context.sender;
    const existedEvent = EventStorage.get(id);
    if (existedEvent == null || existedEvent.owner != sender) {
        return false;
    }
    existedEvent.remove();
    return true;
}

export function interest_event(event_id: string, invitation_code: string = ''): bool {
    const event: Event | null = EventStorage.get(event_id);
    if (!event) return false;
    return event.interest(invitation_code);
}

export function not_interest_event(event_id: string): bool {
    const event: Event | null = EventStorage.get(event_id);
    if (!event) return false;
    return event.not_interest();
}

export function join_event(event_id: string, invitation_code: string = ''): bool {
    const event: Event | null = EventStorage.get(event_id);
    if (!event) return false;
    if (u128.lt(Context.attachedDeposit, event.get_participant_fee())) {
        return false;
    }
    if (u128.eq(u128.Zero, event.get_participant_fee())) {
        return false;
    }
    if (!u128.eq(u128.Zero, event.get_participant_fee())) {
        let withdraw_token = u128.sub(Context.attachedDeposit, u128.from(JOIN_EVENT_COST));
        ContractPromiseBatch.create(event.owner).transfer(withdraw_token);
    }
    return event.join(invitation_code);
}

export function exit_event(event_id: string): bool {
    const event: Event | null = EventStorage.get(event_id);
    if (!event) return false;
    return event.exit_event();
}
