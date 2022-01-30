import { Context, u128, util } from "near-sdk-as";
import { getPaginationOffset, PaginationResult } from "../helper/pagination.helper";
import { FormStorage } from "../storage/form.storage";
import { ParticipantFormStorage } from "../storage/participant.storage";
import { UserStorage } from "../storage/user.storage";
import Base from "./base.model";
import Form, { FORM_TYPE } from "./form.model";
import { ParticipantFormResponse } from "./response/participant_form";

export enum USER_STATUS {
    ACTIVE,
    INACTIVE,
}

export const OVER_CREATE_FORM_FEE = "500000000000000000000000";
@nearBindgen
export default class User extends Base {
    private id: string;
    private status: USER_STATUS;
    private income: u128;
    private outcome: u128;
    private holding: u128;
    private created_at: u64;
    private last_modify: u64;
    private forms_owner: Set<string>;
    private events_owner: Set<string>;
    private forms_joined: Set<string>;
    private events_joined: Set<string>;

    constructor() {
        super();
        this.id = Context.sender;
        this.income = u128.Zero;
        this.outcome = u128.Zero;
        this.holding = u128.Zero;
        this.status = USER_STATUS.ACTIVE;
        this.created_at = Context.blockTimestamp / 1000000;
        if (this.forms_owner == null) {
            this.forms_owner = new Set<string>();
        }

        if (this.events_owner == null) {
            this.events_owner = new Set<string>();
        }

        if (this.forms_joined == null) {
            this.forms_joined = new Set<string>();
        }

        if (this.events_joined == null) {
            this.events_joined = new Set<string>();
        }
    }

    set_status(status: USER_STATUS): void {
        this.status = status;
    }

    get_status(): USER_STATUS {
        return this.status;
    }

    join_form(formId: string): void {
        this.forms_joined.add(formId);
    }

    get_join_form_status(formId: string): bool {
        return this.forms_joined.has(formId);
    }

    get_storage_fee(): u128 {
        return this.storageFee;
    }

    get_joined_form(page: i32): PaginationResult<ParticipantFormResponse> {
        const forms = this.forms_joined.values();
        const forms_length = forms.length;
        const paginationOffset = getPaginationOffset(forms_length, page);

        const start_index = paginationOffset.startIndex;
        const end_index = paginationOffset.endIndex;
        let ret = new Set<ParticipantFormResponse>();
        for (let i = start_index; i >= end_index; i--) {
            const form_id = forms[i];
            const form = FormStorage.get(form_id);
            if (form == null) {
                continue;
            }
            const participant_form_id = `${this.id}_${form_id}`;
            const participant_form = ParticipantFormStorage.get(participant_form_id);

            if (participant_form == null) {
                continue;
            }

            const passed_question = participant_form.get_passed_question();
            ret.add(new ParticipantFormResponse(this.id, form_id, form.get_title(), passed_question, form.get_type(), participant_form.get_last_submited()));
        }
        return new PaginationResult(page, forms_length, ret.values());
    }

    get_joined_form_count(): i32 {
        return this.forms_joined.size;
    }

    remove_form_joined(form_id: string): void {
        if (this.forms_joined.has(form_id)) {
            this.forms_joined.delete(form_id);
            const participant_form_id = `${this.id}_${form_id}`;
            ParticipantFormStorage.delete(participant_form_id);
            this.save();
        }
    }

    create_form(title: string, description: string, type: FORM_TYPE): string | null {
        const created_forms = this.forms_owner.size;

        if (created_forms >= 3) {
            const deposited = Context.attachedDeposit;
            if (!this.isHalfNear(deposited)) {
                return null;
            }
            this.outcome = u128.sub(this.outcome, deposited);
        }

        const new_form = new Form(title, description, type);
        new_form.save();
        this.forms_owner.add(new_form.get_id());
        return new_form.get_id();
    }

    save(): void {
        UserStorage.set(this.id, this);
    }

    private isHalfNear(value: u128): bool {
        return u128.eq(value, u128.from(OVER_CREATE_FORM_FEE));
    }
}
