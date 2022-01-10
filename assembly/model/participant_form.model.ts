import { Context, u128 } from "near-sdk-as";
import { ParticipantFormStorage } from "../storage/participant.storage";

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
    }

    generate_id(): void {
        const sender = Context.sender;
        this.id = `${sender}_${this.formId}`;
    }

    set_passed_element(id: string): void {
        this.passed_element.add(id);
    }

    get_passed_element_keys(): string[] {
        if (this.passed_element == null) {
            return new Array<string>(0);
        }

        return this.passed_element.values();
    }

    contain_passed_element(id: string): bool {
        return this.passed_element.has(id);
    }

    save() {
        ParticipantFormStorage.set(this.id, this);
    }
}

export default ParticipantForm;
