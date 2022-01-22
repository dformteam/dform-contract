import { base58, Context, u128, util } from "near-sdk-as";
import { calStorageFee } from "../helper/calculation.helper";
import { EventStorage } from "../storage/event.storage";
import { FormStorage } from "../storage/form.storage";
import Base from "./base.model";
import Form from "./form.model";
import { FORM_TYPE } from "./form.model";

export enum EVENT_TYPE {
    ONLINE,
    INPERSON,
    ONLINE_AND_INPERSON
}

const EVENT_DEFAULT_STORAGE_FEE = "10000000000000000000000"; // 0.01 NEAR
const EVENT_LIMITED_PARTICIPANT = 100000;

@nearBindgen
class Event extends Base {
    public id: string;
    public event_storage_fee: u128 = u128.from(EVENT_DEFAULT_STORAGE_FEE);
    private formId: string;
    public owner: string;
    // private media: Set<string>;
    constructor(
        private name: string,
        private description: string,
        private event_type: EVENT_TYPE,
        private location: string,
        private cover_image: string,
        private start_date: u64,
        private end_date: u64,
    ) {
        super();
        this.owner = Context.sender;
        let form = new Form(`Event: ${this.name}`, this.description, FORM_TYPE.BASIC);
        this.formId = form.get_id();
        form.save();
        this.id = this.formId;
    }

    update_name(name: string): bool {
        this.name = name;
        let form = FormStorage.get(this.formId);
        if (!form) return false;
        form.set_title(`Event: ${this.name}`);
        return true;
    }

    get_name(): string {
        return this.name;
    }

    update_description(description: string): bool {
        this.description = description;
        let form = FormStorage.get(this.formId);
        if (!form) return false;
        form.set_description(this.description);
        return true;
    }

    get_description(): string {
        return this.description;
    }


    update_cover_image(image_url: string): void {
        this.cover_image = image_url;
    }

    get_cover_image(): string {
        return this.cover_image;
    }

    update_event_type(event_type: EVENT_TYPE): void {
        this.event_type = event_type;
    }

    get_event_type(): EVENT_TYPE {
        return this.event_type;
    }

    update_location(location: string): void {
        this.location = location;
    }

    get_location(): string {
        return this.location;
    }

    update_start_date(date: u64): void {
        this.start_date = date;
    }

    update_end_date(date: u64): void {
        this.end_date = date;
    }

    get_start_date(): u64 {
        return this.start_date;
    }

    get_end_date(): u64 {
        return this.end_date;
    }

    remove(): void {
        EventStorage.delete(this.id);
    }

    publish_event(limit_participants: i32, enroll_fee: u128, black_list: Set<string>, white_list: Set<string>): bool {
        let form = FormStorage.get(this.formId);
        if (!form) return false;
        return form.publish(limit_participants, enroll_fee, this.start_date, this.end_date, black_list, white_list);
    }

    save(): void {
        EventStorage.set(this.id, this);
    }
}

export default Event;