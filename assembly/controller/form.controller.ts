import { Context, u128, ContractPromiseBatch } from "near-sdk-core";
import { PaginationResult } from "../helper/pagination.helper";
import Form from "../model/form.model";
import { FORM_TYPE } from "../model/form.model";
import { FormStatusResponse } from "../model/response/form_status";
import User from "../model/user.model";
import { FormStorage, UserFormStorage } from "../storage/form.storage";
import { UserStorage } from "../storage/user.storage";

const FREE_FORM_MAX_NUM_PARTICIPANTS = 50;

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
    if (u128.eq(u128.Zero, existedForm.get_enroll_fee()) && existedForm.get_current_num_participants() >= FREE_FORM_MAX_NUM_PARTICIPANTS) {
        return false;
    }
    let join_stt = existedForm.join();
    if (!existedForm.total_storage_fee) {
        return false;
    }
    if (!u128.eq(u128.Zero, existedForm.get_enroll_fee()) && existedForm.total_storage_fee) {
        let withdraw_token = u128.sub(Context.attachedDeposit, existedForm.total_storage_fee);
        ContractPromiseBatch.create(existedForm.get_owner()).transfer(withdraw_token);
    }

    return true && join_stt;
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

export function get_forms_count(): i32 {
    return FormStorage.count();
}

export function claim_reward(formId: string): u128 {
    const existedForm = FormStorage.get(formId);
    const sender = Context.sender;
    if (existedForm == null || existedForm.get_owner() != sender) {
        return u128.Zero;
    }
    return existedForm.claim();
}
