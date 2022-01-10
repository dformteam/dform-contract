import { Context } from "near-sdk-core";
import { u128 } from "near-sdk-as";
import { PAGE_SIZE, pagination, PaginationResult } from "../helper/pagination.helper";
import Form from "../model/form.model";
import { Participant } from "../model/participant.model";
import { FormStorage, UserFormStorage } from "../storage/form.storage";
import { ParticipantStatus } from "../model/participant.model";

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
