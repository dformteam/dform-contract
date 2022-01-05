import { Context, logging } from "near-sdk-core";
import { pagination, PaginationResult } from "../helper/pagination.helper";
import { UserAnswer } from "../model/answer.model";
import { FormStorage } from "../storage/form.storage";

export function submit_answer(formId: string, questionId: string, answer: string): bool {
    const sender = Context.sender;
    const form = FormStorage.get(formId);
    if (form == null) {
        return false;
    }

    const submit_result = form.submit_answer(sender, questionId, answer);
    return submit_result;
}

export function get_answer_statistical(userId: string, formId: string, page: i32): PaginationResult<UserAnswer> {
    const sender = Context.sender;
    const form = FormStorage.get(formId);
    if (form == null || (form.get_owner() != sender && userId != sender)) {
        return new PaginationResult(1, 0, new Array<UserAnswer>(0));
    }

    // const userAnswers = AnswerStorage.get(formId, userId);
    const userAnswers = form.get_answer(userId);
    return pagination(userAnswers, page);
}
