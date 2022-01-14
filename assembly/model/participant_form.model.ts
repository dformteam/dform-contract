import { Context, u128 } from "near-sdk-as";
import { ElementStorage } from "../storage/element.storage";
import { ParticipantFormStorage } from "../storage/participant.storage";
import { ElementType } from "./element.model";

@nearBindgen
class ParticipantForm {
    private id: string;
    private lastSubmitTimestamp: u64;
    private cashSpent: u128 = u128.from(0);
    private submitTimes: u32 = 0;
    private passed_element: Set<string>;

    constructor(private formId: string) {
        if (this.passed_element == null) {
            this.passed_element = new Set<string>();
        }
        this.generate_id();
    }

    generate_id(): void {
        const sender = Context.sender;
        this.id = `${sender}_${this.formId}`;
    }

    set_passed_element(id: string): void {
        this.lastSubmitTimestamp = Context.blockTimestamp / 1000000;
        this.submitTimes = this.submitTimes + 1;
        this.passed_element.add(id);
    }

    get_passed_element_keys(): string[] {
        if (this.passed_element == null) {
            return new Array<string>(0);
        }

        return this.passed_element.values();
    }

    get_passed_element_count(): i32{
        return this.passed_element.size;
    }

    get_passed_question(): i32 {
        const elements = this.passed_element.values();
        let count = 0;
        for (let i = 0; i< elements.length; i++){
            const element = ElementStorage.get(elements[i]);
            if (element != null && element.get_type() != ElementType.HEADER){
                count = count + 1;
            }
        }

        return count;
    }

    contain_passed_element(id: string): bool {
        return this.passed_element.has(id);
    }

    save(): void {
        ParticipantFormStorage.set(this.id, this);
    }
}

export default ParticipantForm;
