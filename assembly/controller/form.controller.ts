import { Context, u128 } from "near-sdk-core";
import { PaginationResult } from "../helper/pagination.helper";
import Form from "../model/form.model";
import { FORM_TYPE } from "../model/form.model";
import { FormStatusResponse } from "../model/response/form_status";
import { FormStorage, OwnerStorage, UserFormStorage } from "../storage/form.storage";

const OVER_CREATE_FORM_FEE = "500000000000000000000000"; // 0.5 NEAR

export function init_new_form(title: string, description: string, type: FORM_TYPE): string | null {
    if (title == "") {
        return null;
    }
    if ((OwnerStorage.get(Context.sender) > 3) && (u128.lt(Context.attachedDeposit, u128.from(OVER_CREATE_FORM_FEE)))) return null;
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
    return existedForm.join();
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
