import { base58, Context, u128, util } from "near-sdk-as";
import { calStorageFee } from "../helper/calculation.helper";
import { EventStorage } from "../storage/event.storage";
import Base from "./base.model";
import Form, { FORM_TYPE } from "./form.model";

export enum EVENT_TYPE {
    ONLINE,
    INPERSON,
    ONLINE_AND_INPERSON
}

const EVENT_DEFAULT_STORAGE_FEE = "10000000000000000000000"; // 0.01 NEAR

@nearBindgen
class Event extends Form {
    public event_storage_fee: u128 = u128.from(EVENT_DEFAULT_STORAGE_FEE);
    // private media: Set<string>;
    constructor(
        name: string,
        description: string,
        private event_type: EVENT_TYPE,
        private location: string,
        private cover_image: string,
    ) {
        super(`Event: ${name}`, description, FORM_TYPE.BASIC);
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

    save_event(): void {
        EventStorage.set(this.id, this);
        let current_event_fee: u128 = calStorageFee(this.get_id(), `{
            even_type: ${this.event_type},
            localtion: ${this.location},
            cover_image: ${this.cover_image},
            event_storage_fee: ${this.event_storage_fee}
        }`);
        this.componentStorageFee.push({
            id: 'EventStorage',
            value: current_event_fee
        });
        this.save();
    }
}

export default Event;