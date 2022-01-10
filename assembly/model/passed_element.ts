import { Context } from "near-sdk-core";
import { ElementType } from "./element.model";

@nearBindgen
export class UserAnswer {
    private participantId: string;
    constructor(private element_id: string, private title: string, private type: ElementType, private answer: string, private submit_time: u64) {
        this.participantId = Context.sender;
    }
}

@nearBindgen
class PassedElement {
    private id: string;
    private owner: string;
    private submit_time: u64;
    constructor(private elementId: string, private content: string) {
        this.owner = Context.sender;
        this.submit_time = Context.blockTimestamp;
    }

    generate_answer_id(): void {
        this.id = `${this.owner}_${this.elementId}`;
    }

    get_content(): string {
        return this.content;
    }

    get_submit_time(): u64 {
        return this.submit_time;
    }

    get_element_id(): string {
        return this.id;
    }

    save(): void {}
}

export default PassedElement;