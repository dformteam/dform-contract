import * as Form from "./controller/form.controller";
import * as Question from "./controller/element.controller";
import * as Answer from "./controller/answer.controller";
import * as Participant from "./controller/participant.controller";

import { PaginationResult } from "./helper/pagination.helper";
import FormModel from "./model/form.model";
import QuestionModel from "./model/element.model";
import { ElementType } from "./model/element.model";
import { UserAnswer } from "./model/passed_element";
import { u128 } from "near-sdk-as";
import { ParticipantFormResponse } from "./model/response/participant_form";

export function init_new_form(title: string, description: string): string | null {
    return Form.init_new_form(title, description);
}

export function get_form(id: string): FormModel | null {
    return Form.get_form(id);
}

export function publish_form(formId: string, limit_participants: i32, enroll_fee: u128, start_date: u64, end_date: u64): bool {
    return Form.publish_form(formId, limit_participants, enroll_fee, start_date, end_date);
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

export function new_element(formId: string, type: ElementType, title: string, meta: string, isRequired: bool): QuestionModel | null {
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

export function submit_answer(formId: string, elementId: string, answer: string): bool {
    return Answer.submit_answer(formId, elementId, answer);
}

export function update_element(formId: string, id: string, title: string, meta: string): QuestionModel | null {
    return Question.update_element(formId, id, title, meta);
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

