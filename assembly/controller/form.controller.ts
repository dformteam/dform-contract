import { Context, u128 } from "near-sdk-core";
import { PaginationResult } from "../helper/pagination.helper";
import Form from "../model/form.model";
import { FormStorage, UserFormStorage } from "../storage/form.storage";

export function init_new_form(title: string, description: string): string | null {
    if (title == "") {
        return null;
    }
    const newForm = new Form(title, description);
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

export function publish_form(formId: string, limit_participants: i32, enroll_fee: u128, start_date: u64, end_date: u64): bool {
    const existedForm = FormStorage.get(formId);
    if (existedForm == null) {
        return false;
    }
    return existedForm.publish(limit_participants, enroll_fee, start_date, end_date);
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
    if (form && sender === form.get_owner()) {
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