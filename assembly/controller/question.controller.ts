import { Context } from "near-sdk-core";
import { pagination, PaginationResult } from "../helper/pagination.helper";
import Question from "../model/question.model";
import { QuestionType } from "../model/question.model";
import { FormStorage } from "../storage/form.storage";

export function new_question(formId: string, type: QuestionType, title: string, meta: string, isRequired: bool): Question | null {
    if (title == "") {
        return null;
    }
    const existedForm = FormStorage.get(formId);
    if (existedForm == null) {
        return null;
    }

    return existedForm.add_new_question(type, title, meta, isRequired);
}

export function delete_question(formId: string, id: string): bool {
    const sender = Context.sender;
    const form = FormStorage.get(formId);

    if (form == null) {
        return false;
    }

    if (form.get_owner() != sender) {
        return false;
    }

    const result = form.remove_question(id);

    return result;
}

export function update_question(formId: string, id: string, title: string, meta: string): Question | null {
    const sender = Context.sender;
    const form = FormStorage.get(formId);

    if (form == null) {
        return null;
    }

    if (form.get_owner() != sender) {
        return null;
    }

    form.set_question_title(id, title);
    form.set_question_meta(id, meta);
    form.save();
    return form.get_question(id);
}

export function get_question(userId: string, formId: string): Question | null {
    const form = FormStorage.get(formId);
    if (form == null) {
        return null;
    }
    return form.get_next_question(userId);
}

export function get_question_count(formId: string): i32 {
    const form = FormStorage.get(formId);
    if (form == null) {
        return 0;
    }
    return form.get_max_question();
}

export function get_questions(userId: string, formId: string, page: i32): PaginationResult<Question> {
    const form = FormStorage.get(formId);
    if (form == null) {
        return new PaginationResult(1, 0, new Array<Question>(0));
    }

    if (form.get_owner() != userId) {
        return new PaginationResult(1, 0, new Array<Question>(0));
    }
    
    const questions = form.get_questions();
    return pagination<Question>(questions, page);
}
