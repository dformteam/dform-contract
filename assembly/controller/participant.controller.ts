import { Context } from "near-sdk-as";
import { pagination, PaginationResult } from "../helper/pagination.helper";
import { UserAnswer } from "../model/passed_element";
import { FormStorage } from "../storage/form.storage";
import { ParticipantStorage } from "../storage/participant.storage";
import { ParticipantFormResponse } from "../model/response/participant_form";

// export function get_participants(formId: string, page: i32): PaginationResult<string> {
//     const form = FormStorage.get(formId);
//     if (form == null) {
//         return new PaginationResult(1, 0, new Array<string>(0));
//     }

export function get_joined_forms(userId: string, page: i32): PaginationResult<ParticipantFormResponse> {
    const participant = ParticipantStorage.get(userId);

    if (participant == null) {
        return new PaginationResult(1, 0, new Array<ParticipantFormResponse>(0));
    }

    return participant.get_joined_form(page)
}

export function get_answer_statistical(userId: string, formId: string, page: i32): PaginationResult<UserAnswer> {
    const sender = Context.sender;
    const form = FormStorage.get(formId);
    if (form == null || (form.get_owner() != sender && userId != sender)) {
        return new PaginationResult(1, 0, new Array<UserAnswer>(0));
    }

    // const sender = Context.sender;
    return form.get_answer(userId, page);
    // const userAnswers = AnswerStorage.get(formId, userId);
}

//     const participants = ParticipantFormStorage.get(formId);
//     return pagination(participants, page);
// }

// export function join_form(formId: string): Participant | null {
//     const sender = Context.sender;
//     const form = FormStorage.get(formId);

//     if (form == null) {
//         return null;
//     }

//     const compare_enroll_fee = u128.lt(Context.attachedDeposit, form.get_enroll_fee());

//     if (compare_enroll_fee) {
//         return null;
//     }

//     const participantId = `${formId}_${sender}`;

//     if (!ParticipantDetailStorage.contains(participantId)) {
//         new Participant(formId, sender);
//     }

//     let participant = ParticipantDetailStorage.get(participantId);

//     if (!participant) return null;
//     participant.join();
//     ParticipantFormStorage.set(sender, formId);
//     return participant;
// }

// export function get_participant_detail(formId: string, userId: string): Participant | null {
//     const participantId = `${formId}_${userId}`;
//     return ParticipantDetailStorage.get(participantId);
// }

// export function get_participants_detail(formId: string, page: i32): PaginationResult<Participant> | null {
//     const participantsId = ParticipantFormStorage.get(formId);
//     if (!participantsId) return null;
//     let participantsDetail = new Set<Participant>();
//     let minRange = page * PAGE_SIZE;
//     let maxRange = page * PAGE_SIZE + PAGE_SIZE;
//     if (participantsId.length < maxRange) maxRange = participantsId.length;
//     for (let i = minRange; i < maxRange; i++) {
//         if (!participantsId[i]) continue;
//         let participant: Participant | null = ParticipantDetailStorage.get(`${formId}_${participantsId[i]}`);
//         if (participant) {
//             participantsDetail.add(participant);
//         }
//     }
//     return new PaginationResult(page, maxRange, participantsDetail.values());
// }

// export function update_participant_status(formId: string, userId: string, status: ParticipantStatus): Participant | null {
//     const participantId = `${formId}_${userId}`;
//     let participant: Participant | null = ParticipantDetailStorage.get(participantId);
//     if (!participant) return null;
//     participant.updateStatus(status);
//     return participant;
// }

// export function get_enroll_fee(formId: string): u128 | null {
//     let form: Form | null = FormStorage.get(formId);
//     if (!form) return null;
//     return form.get_enroll_fee();
// }

// export function set_enroll_fee(formId: string, new_fee: u128): u128 | null {
//     let form: Form | null = FormStorage.get(formId);
//     if (!form) return null;
//     return form.set_enroll_fee(new_fee);
// }
