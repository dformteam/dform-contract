import { Context, u128 } from "near-sdk-as";
import { PAGE_SIZE, pagination, PaginationResult } from "../helper/pagination.helper";
import Form from "../model/form.model";
import { Participant, ParticipantStatus } from "../model/participant.model";
import { FormStorage } from "../storage/form.storage";

// export function get_participants(formId: string, page: i32): PaginationResult<string> {
//     const form = FormStorage.get(formId);
//     if (form == null) {
//         return new PaginationResult(1, 0, new Array<string>(0));
//     }

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
