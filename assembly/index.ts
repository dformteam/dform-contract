import * as Form from "./controller/form.controller";
import * as Question from "./controller/element.controller";
import * as Answer from "./controller/answer.controller";
import * as Participant from "./controller/participant.controller";
import * as Event from "./controller/event.controller";

import { PaginationResult } from "./helper/pagination.helper";
import FormModel from "./model/form.model";
import { FORM_TYPE } from "./model/form.model";
import QuestionModel from "./model/element.model";
import { ElementType } from "./model/element.model";
import { UserAnswer } from "./model/passed_element";
import { logging, u128 } from "near-sdk-as";
import { ParticipantFormResponse } from "./model/response/participant_form";
import { FormStatusResponse } from "./model/response/form_status";
import EventModel from "./model/event.model";
import { EVENT_TYPE } from "./model/event.model";

export function init_new_form(title: string, description: string, type: FORM_TYPE): string | null {
    return Form.init_new_form(title, description, type);
}

export function get_form(id: string): FormModel | null {
    return Form.get_form(id);
}

export function publish_form(
    formId: string,
    limit_participants: i32,
    enroll_fee: u128,
    start_date: u64,
    end_date: u64,
    black_list: Set<string>,
    white_list: Set<string>,
): bool {
    return Form.publish_form(formId, limit_participants, enroll_fee, start_date, end_date, black_list, white_list);
}

export function unpublish_form(formId: string): bool {
    return Form.unpublish_form(formId);
}

export function join_form(formId: string): bool {
    return Form.join_form(formId);
}

export function get_forms(userId: string, page: i32): PaginationResult<FormModel> {
    return Form.get_forms(userId, page);
}

export function get_joined_forms(userId: string, page: i32): PaginationResult<ParticipantFormResponse> {
    return Participant.get_joined_forms(userId, page);
}

export function new_element(formId: string, type: ElementType, title: string[], meta: Set<string>, isRequired: bool): QuestionModel | null {
    return Question.new_element(formId, type, title, meta, isRequired);
}

export function delete_element(formId: string, id: string): bool {
    return Question.delete_element(formId, id);
}

export function get_element(userId: string, formId: string): QuestionModel | null {
    return Question.get_element(userId, formId);
}

export function get_elements(userId: string, formId: string, page: i32): PaginationResult<QuestionModel> {
    return Question.get_elements(userId, formId, page);
}

export function get_element_count(formId: string): i32 {
    return Question.get_element_count(formId);
}

export function get_form_count(userId: string): i32 {
    return Form.get_form_count(userId);
}

export function get_form_status(formId: string): FormStatusResponse {
    return Form.get_form_status(formId);
}

export function submit_answer(formId: string, elementId: string, answer: Set<string>): bool {
    return Answer.submit_answer(formId, elementId, answer);
}

export function update_element(formId: string, id: string, title: string[], meta: Set<string>, isRequired: bool): QuestionModel | null {
    return Question.update_element(formId, id, title, meta, isRequired);
}

export function update_form(id: string, title: string, description: string): FormModel | null {
    return Form.update_form(id, title, description);
}

export function delete_form(id: string): bool {
    return Form.delete_form(id);
}

export function get_answer_statistical(userId: string, formId: string, page: i32): PaginationResult<UserAnswer> {
    return Participant.get_answer_statistical(userId, formId, page);
}

export function test(title: Set<string>): void {
    logging.log(title.values());
}

// export function get_participants(formId: string, page: i32): PaginationResult<string> {
//     return Form.get_participants(formId, page);
// }

// export function join_form(formId: string): Participant | null {
//     return Form.join_form(formId);
// }

// export function get_participant_detail(formId: string, userId: string): Participant | null {
//     return Form.get_participant_detail(formId, userId);
// }

// export function get_participants_detail(formId: string, page: i32): PaginationResult<Participant> | null {
//     return Form.get_participants_detail(formId, page);
// }

// export function update_participant_status(formId: string, userId: string, status: ParticipantStatus): Participant | null {
//     return Form.update_participant_status(formId, userId, status);
// }

export function get_enroll_fee(formId: string): u128 | null {
    return Form.get_enroll_fee(formId);
}

export function set_enroll_fee(formId: string, new_fee: u128): u128 | null {
    return Form.set_enroll_fee(formId, new_fee);
}

export function init_new_event(
    title: string,
    description: string,
    type: EVENT_TYPE,
    location: string,
    cover_img: string,
    start_date: u64,
    end_date: u64
): string | null {
    return Event.init_new_event(title, description, type, location, cover_img, start_date, end_date);
}

export function get_register_form_id(event_id: string): string | null {
    return Event.get_register_form_id(event_id);
}

export function get_event(event_id: string): EventModel | null {
    return Event.get_event(event_id);
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
    return Event.update_event_info(event_id, title, description, location, cover_img, start_date, end_date);
}

export function update_event_type(event_id: string, event_type: EVENT_TYPE): bool {
    return Event.update_event_type(event_id, event_type);
}

export function set_participant_fee(event_id: string, new_fee: u128): u128 | null {
    return Event.set_participant_fee(event_id, new_fee);
}

export function get_participant_fee(event_id: string): u128 | null {
    return Event.get_participant_fee(event_id);
}

export function delete_event(event_id: string): bool {
    return Event.delete_event(event_id);
}

export function publish_event(event_id: string, limit_participants: i32, enroll_fee: u128, black_list: Set<string>, white_list: Set<string>): bool {
    return Event.publish_event(event_id, limit_participants, enroll_fee, black_list, white_list);
}