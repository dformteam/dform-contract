import { base58, Context, util } from "near-sdk-core";
import { u128 } from "near-sdk-as";
import { pagination, PaginationResult } from "../helper/pagination.helper";
import Form from "../model/form.model";
import { Participant } from "../model/participant.model";
import { QuestionType } from "../model/question.model";
import { FormStorage, ParticipantDetailStorage, ParticipantFormStorage, UserFormStorage } from "../storage/form.storage";

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
    const forms = UserFormStorage.gets(userId);
    return pagination<Form>(forms, page);
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

export function get_participants(formId: string, page: i32): PaginationResult<string> {
    const form = FormStorage.get(formId);
    if (form == null) {
        return new PaginationResult(1, 0, new Array<string>(0));
    }

    const participants = ParticipantFormStorage.get(formId);
    return pagination(participants, page);
}

export function join_form(formId: string): Participant | null {
    const sender = Context.sender;
    const form: Form | null = FormStorage.get(formId);
    if (!form) return null;
    if (u128.lt(Context.attachedDeposit, form.get_enroll_fee())) return null;
    const participantId = `${formId}_${sender}`;
    if (!ParticipantDetailStorage.contains(participantId)) {
        new Participant(formId, sender);
    }
    let participant = ParticipantDetailStorage.get(participantId);
    if (!participant) return null;
    participant.join();
    return participant;
}