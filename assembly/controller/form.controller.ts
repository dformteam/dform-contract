import { Context, u128 } from "near-sdk-core";
import { PaginationResult } from "../helper/pagination.helper";
import Form from "../model/form.model";
import { FORM_TYPE } from "../model/form.model";
import { FormStatusResponse } from "../model/response/form_status";
import { FormStorage, UserFormStorage } from "../storage/form.storage";
import { ContractPromiseBatch, logging } from "near-sdk-as";

const FREE_FORM_MAX_NUM_PARTICIPANTS = 50;
const CREATE_FORM_COST = "10000000000000000000"; // 1 NEAR

export function init_new_form(title: string, description: string, type: FORM_TYPE): string | null {
    if (title == "") {
        return null;
    }
    if (u128.lt(Context.attachedDeposit, u128.from(CREATE_FORM_COST))) {
        return null;
    }
    const newForm = new Form(title, description, type);
    newForm.save();
    return newForm.get_id();
}

export function get_form(id: string): Form | null {
    return FormStorage.get(id);
}

export function get_forms(userId: string, page: i32): PaginationResult<Form> {
    return UserFormStorage.gets(userId, page);
}

export function get_form_count(userId: string): i32 {
    return UserFormStorage.count(userId);
}

export function get_form_status(formId: string): FormStatusResponse {
    const form = FormStorage.get(formId);
    if (form == null) {
        return new FormStatusResponse("", "", 0);
    }

    return new FormStatusResponse(formId, form.get_owner(), form.get_status());
}

export function update_form(id: string, title: string, description: string): Form | null {
    const sender = Context.sender;
    const existedForm = FormStorage.get(id);
    if (existedForm == null || existedForm.get_owner() != sender) {
        return null;
    }

    existedForm.set_title(title);
    existedForm.set_description(description);
    existedForm.save();
    return existedForm;
}

export function delete_form(id: string): bool {
    const sender = Context.sender;
    const existedForm = FormStorage.get(id);
    if (existedForm == null || existedForm.get_owner() != sender) {
        return false;
    }
    existedForm.remove();
    return true;
}

export function join_form(formId: string): bool {
    const existedForm = FormStorage.get(formId);
    if (existedForm == null) {
        return false;
    }
    if (u128.lt(Context.attachedDeposit, existedForm.get_enroll_fee())) {
        return false;
    }
    if (u128.eq(u128.Zero, existedForm.get_enroll_fee()) && (existedForm.get_current_num_participants() >= (FREE_FORM_MAX_NUM_PARTICIPANTS))) {
        return false;
    }
    let current_storage_fee: u128 | null = existedForm.join();
    if (!current_storage_fee) {
        return false;
    }
    if (!u128.eq(u128.Zero, existedForm.get_enroll_fee()) && current_storage_fee) {
        let withdraw_token = u128.sub(Context.attachedDeposit, current_storage_fee);
        logging.log(`withdraw_token => ${withdraw_token}`);
        ContractPromiseBatch.create(existedForm.get_owner()).transfer(withdraw_token);
    }

    return true;
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
    const existedForm = FormStorage.get(formId);
    if (existedForm == null) {
        return false;
    }
    return existedForm.publish(limit_participants, enroll_fee, start_date, end_date, black_list, white_list);
}

export function unpublish_form(formId: string): bool {
    const existedForm = FormStorage.get(formId);
    const sender = Context.sender;
    if (existedForm == null || existedForm.get_owner() != sender) {
        return false;
    }

    return existedForm.unpublish();
}

export function set_enroll_fee(formId: string, new_fee: u128): u128 | null {
    const form = FormStorage.get(formId);
    const sender = Context.sender;
    if (form && (sender == form.get_owner())) {
        return form.set_enroll_fee(new_fee);
    }
    return null;
}

export function get_enroll_fee(formId: string): u128 | null {
    const form = FormStorage.get(formId);
    if (form) {
        return form.get_enroll_fee();
    }
    return null;
}