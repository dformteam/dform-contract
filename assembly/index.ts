import * as Form from "./controller/form.controller";
import * as Question from "./controller/element.controller";
import * as Answer from "./controller/answer.controller";
import * as Participant from "./controller/participant.controller";

import { logging, u128 } from "near-sdk-as";
import { PaginationResult } from "./helper/pagination.helper";
import FormModel from "./model/form.model";
import { FORM_TYPE } from "./model/form.model";
import QuestionModel from "./model/element.model";
import { ElementType } from "./model/element.model";
import { UserAnswer } from "./model/passed_element";
import { ParticipantFormResponse } from "./model/response/participant_form";
import { FormStatusResponse } from "./model/response/form_status";
import { ParticipantFormStatusResponse } from "./model/response/participant_form_status";

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

export function get_joined_forms_count(userId: string): i32 {
    return Participant.get_joined_forms_count(userId);
}

export function new_element(formId: string, type: ElementType, title: string[], meta: Set<string>, isRequired: bool, numth: i32): QuestionModel | null {
    return Question.new_element(formId, type, title, meta, isRequired, numth);
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
    logging.log(elementId);
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

export function get_participant_form_status(userId: string, formId: string): ParticipantFormStatusResponse {
    return Participant.get_participant_form_status(userId, formId);
}

export function test(title: Set<string>): void {
    logging.log(title.values());
}

export function get_passed_element_count(userId: string, formId: string): i32 {
    return Participant.get_passed_element_count(userId, formId);
}

export function get_participants_count(): i32 {
    return Participant.get_participants_count();
}

export function get_forms_count(): i32 {
    return Form.get_forms_count();
}
