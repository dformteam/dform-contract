import { Context } from "near-sdk-core";
import { pagination, PaginationResult } from "../helper/pagination.helper";
import Question from "../model/element.model";
import { ElementType } from "../model/element.model";
import { FormStorage } from "../storage/form.storage";

export function new_element(formId: string, type: ElementType, title: string, meta: string, isRequired: bool): Question | null {
    if (title == "") {
        return null;
    }
    const existedForm = FormStorage.get(formId);
    if (existedForm == null) {
        return null;
    }

    return existedForm.add_new_element(type, title, meta, isRequired);
}

export function delete_element(formId: string, id: string): bool {
    const sender = Context.sender;
    const form = FormStorage.get(formId);

    if (form == null) {
        return false;
    }

    if (form.get_owner() != sender) {
        return false;
    }

    const result = form.remove_element(id);

    return result;
}

export function update_element(formId: string, id: string, title: string, meta: string): Question | null {
    const sender = Context.sender;
    const form = FormStorage.get(formId);

    if (form == null) {
        return null;
    }

    if (form.get_owner() != sender) {
        return null;
    }

    form.set_element_title(id, title);
    form.set_element_meta(id, meta);
    form.save();
    return form.get_element(id);
}

export function get_element(userId: string, formId: string): Question | null {
    const form = FormStorage.get(formId);
    if (form == null) {
        return null;
    }
    return form.get_next_element(userId);
}

export function get_element_count(formId: string): i32 {
    const form = FormStorage.get(formId);
    if (form == null) {
        return 0;
    }
    return form.get_max_element();
}

export function get_elements(userId: string, formId: string, page: i32): PaginationResult<Question> {
    const form = FormStorage.get(formId);
    if (form == null) {
        return new PaginationResult(1, 0, new Array<Question>(0));
    }

    if (form.get_owner() != userId) {
        return new PaginationResult(1, 0, new Array<Question>(0));
    }
    
    const elements = form.get_elements();
    return pagination<Question>(elements, page);
}
