import { base58, Context, logging, u128, util } from "near-sdk-as";
import { calStorageFee } from "../helper/calculation.helper";
import { EventStorage } from "../storage/event.storage";
import { FormStorage } from "../storage/form.storage";
import Base from "./base.model";
import Form from "./form.model";
import { FORM_TYPE } from "./form.model";
import Participant from "./participant.model";

export enum EVENT_TYPE {
    ONLINE,
    INPERSON,
    ONLINE_AND_INPERSON
}

export enum PUBLIC_PARTICIPANT_TYPE {
    INTERESTED,
    JOINED
}

export enum AVAILABLE_TYPE {
    PUBLIC,
    INVITE_ONLY
}

const EVENT_DEFAULT_STORAGE_FEE = "100000000000000000000000"; // 0.1 NEAR
const EVENT_LIMITED_PARTICIPANT = 100000;

@nearBindgen
class Event extends Base {
    public id: string;
    public event_storage_fee: u128 = u128.from(EVENT_DEFAULT_STORAGE_FEE);
    public owner: string;
    public created_at: u64;
    private participants: Set<string>;
    private interests: Set<string>;
    private invitation_code: string;
    public limit_participants: i32;
    public description: string;
    public location: string;
    public cover_image: string;
    public start_date: u64;
    public end_date: u64;
    // private media: Set<string>;
    constructor(
        private name: string,
        private event_type: EVENT_TYPE,
        private available_type: AVAILABLE_TYPE,
        private participant_fee: u128
    ) {
        super();
        this.created_at = Context.blockTimestamp / 1000000;
        this.owner = Context.sender;
        if (this.available_type == AVAILABLE_TYPE.INVITE_ONLY) {
            this.generate_invitation_code();
        }
        if (this.participants == null) {
            this.participants = new Set<string>();
        }
        if (this.interests == null) {
            this.interests = new Set<string>();
        }
        this.generate_id();
    }

    private generate_invitation_code(): void {
        let iviCode: string = "";
        while (iviCode == "") {
            const blockTime = Context.epochHeight.toString() + Context.sender + Context.blockTimestamp.toString();
            const hBlockTime = base58.encode(util.stringToBytes(blockTime));
            if (!FormStorage.contains(hBlockTime)) {
                iviCode = hBlockTime;
            }
        }
        this.invitation_code = iviCode;
    }

    private generate_id(): void {
        let eventId: string = "";
        while (eventId == "") {
            const blockTime = "Event_" + Context.sender + Context.blockTimestamp.toString();
            const hBlockTime = base58.encode(util.stringToBytes(blockTime));
            if (!FormStorage.contains(hBlockTime)) {
                eventId = hBlockTime;
            }
        }
        this.id = eventId;
    }

    private toString(): string {
        return `{id: ${this.id}, owner: ${this.owner}, description: ${this.description}, participants: ${this.participants.values()}, interests: ${this.interests.values()} }`;
    }

    get_invitation_code(): string | null {
        if (this.available_type == AVAILABLE_TYPE.PUBLIC) return null;
        return this.invitation_code;
    }

    get_id(): string {
        return this.id;
    }

    interest(invitation_code: string = ''): bool {
        // let current_timestamp = Context.blockTimestamp / 1000000;
        // if (this.end_date && current_timestamp > this.end_date) return false;
        if (this.available_type == AVAILABLE_TYPE.INVITE_ONLY && this.invitation_code != invitation_code) {
            return false;
        }
        const sender = Context.sender;
        if (!this.interests.has(sender)) {
            this.interests.add(sender);
            this.save();
            return true;
        }
        return false;
    }

    not_interest(): bool {
        // let current_timestamp = Context.blockTimestamp / 1000000;
        // if (this.end_date && current_timestamp > this.end_date) return false;
        const sender = Context.sender;
        if (this.interests.has(sender)) {
            this.interests.delete(sender);
            this.save();
            return true;
        }
        return false;
    }

    join(invitation_code: string = ''): bool {
        // let current_timestamp = Context.blockTimestamp / 1000000;
        // if (this.end_date && current_timestamp > this.end_date) return false;
        if ((this.available_type == AVAILABLE_TYPE.INVITE_ONLY) && (this.invitation_code != invitation_code)) {
            return false;
        }
        const sender = Context.sender;
        if (!this.participants.has(sender)) {
            const participants_length = this.participants.size;
            if (this.limit_participants != 0 && participants_length >= this.limit_participants) {
                return false;
            }
            this.participants.add(sender);
            this.save();
            return true;
        }
        // if (this.cal_storage_fee(this.id, this.toString()) > this.event_storage_fee) {
        //     return false;
        // }
        return false;
    }

    exit_event(): bool {
        // let current_timestamp = Context.blockTimestamp / 1000000;
        // if (this.end_date && current_timestamp > this.end_date) return false;
        const sender = Context.sender;
        if (this.participants.has(sender)) {
            this.participants.delete(sender);
            this.save();
            return true;
        }
        return false;
    }


    update_participant_fee(new_fee: u128): u128 | null {
        // let current_timestamp = Context.blockTimestamp / 1000000;
        // if (this.start_date && current_timestamp > this.start_date) return null;
        this.participant_fee = new_fee;
        this.save();
        return this.participant_fee;
    }

    get_participant_fee(): u128 {
        return this.participant_fee;
    }

    update_event_info(
        name: string = '',
        description: string = '',
        location: string = '',
        cover_img: string = '',
        start_date: u64 = 0,
        end_date: u64 = 0
    ): bool {
        // let current_timestamp = Context.blockTimestamp / 1000000;
        // if (this.start_date && current_timestamp > this.start_date) return false;
        if (name !== '') this.name = name;
        if (description !== '') this.description = description;
        if (location !== '') this.location = location;
        if (cover_img !== '') this.cover_image = cover_img;
        if (start_date !== 0) this.start_date = start_date;
        if (end_date !== 0) this.end_date = end_date;
        this.save();
        return true;
    }

    get_name(): string {
        return this.name;
    }

    get_description(): string {
        return this.description;
    }

    get_cover_image(): string {
        return this.cover_image;
    }

    // update_event_type(event_type: EVENT_TYPE): void {
    //     this.event_type = event_type;
    // }

    // get_event_type(): EVENT_TYPE {
    //     return this.event_type;
    // }

    get_number_of_participants(): i32 {
        return this.participants.size
    }

    get_number_of_interests(): i32 {
        return this.interests.size
    }

    get_location(): string {
        return this.location;
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

    save(): void {
        EventStorage.set(this.id, this);
    }
}

export default Event;