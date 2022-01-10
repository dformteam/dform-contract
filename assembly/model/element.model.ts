import { base58, Context, util } from "near-sdk-core";
import { eq_array } from "../helper/array";

export enum ElementType {
    HEADER,
    SHORT,
    LONG,
    PHONE,
    DATE,
    TIME,
    DATETIME,
    SINGLE_CHOICE,
    MULTI_CHOICE,
    RATING,
    EMAIL,
}

@nearBindgen
class Element {
    private id: string;
    private owner: string;

    constructor(private type: ElementType, private title: string, private meta: string, private formId: string, private isRequired: bool, private nonce: i32) {
        this.owner = Context.sender;
        this.generate_id(formId);
    }

    private generate_id(formId: string): void {
        let elementId: string = "";
        const blockTime = `${this.owner}_${this.formId}_${this.nonce}`;
        const hBlockTime = base58.encode(util.stringToBytes(blockTime));
        elementId = hBlockTime;
        this.id = elementId;
    }

    get_id(): string {
        return this.id;
    }

    get_form_id(): string {
        return this.formId;
    }

    get_title(): string {
        return this.title;
    }

    get_owner(): string {
        return this.owner;
    }

    get_type(): ElementType {
        return this.type;
    }

    set_title(newTitle: string): void {
        if (newTitle != "" && newTitle != null && newTitle != this.title) {
            this.title = newTitle;
        }
    }

    set_meta(newMeta: string): void {
        if (this.meta != newMeta) {
            this.meta = newMeta;
        }
    }

    toString(): string {
        return `{id: ${this.id}, owner: ${this.owner},q_counter: ${this.title}, title: ${this.title}, meta:${this.meta}}`;
    }
}

export default Element;
