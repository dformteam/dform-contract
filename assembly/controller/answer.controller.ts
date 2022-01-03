import { Context, logging } from "near-sdk-core";
import { pagination, PaginationResult } from "../helper/pagination.helper";
import { UserAnswer } from "../model/answer.model";
import { FormStorage } from "../storage/form.storage";

export function submit_answer(formId: string, questionId: string, answer: string): bool {
    const sender = Context.sender;
    // const qIndex = FormQuestionStorage.indexOf(formId, questionId);

    // if (qIndex == -1) {
    //     return false;
    // }
    const form = FormStorage.get(formId);
    if (form == null) {
        return false;
    }

    const submit_result = form.submit_answer(sender, questionId, answer);

    // const cIndex = Participant.get_cur_ans_index(sender, formId);
    // logging.log(cIndex);
    // //Anti cheat - Auto ignore the ans front
    // if (qIndex - cIndex > 1) {
    //     const questions = FormQuestionStorage.gets(formId);
    //     const questionsLength = questions.length;
    //     if (questionsLength > cIndex + 1) {
    //         const startIndex = cIndex + 1;
    //         const endIndex = qIndex;
    //         for (let i = startIndex; i < endIndex; i++) {
    //             const questionId = questions[i].get_id();
    //             const ans = new Answer(formId, questionId, "");
    //             ans.save();
    //         }
    //     }
    // }
    // const ans = new Answer(formId, questionId, answer);
    // Participant.set_current_ans_index(sender, formId, qIndex);
    // ans.save();
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
