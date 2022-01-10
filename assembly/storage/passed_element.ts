import { PersistentUnorderedMap } from "near-sdk-as";
import PassedElement from "../model/passed_element";
import Answer from "../model/passed_element";

const passedElementPersit = new PersistentUnorderedMap<string, PassedElement>("pAP");

export class PassedElementStorage {
    static get(id: string): PassedElement | null {
        if (passedElementPersit.contains(id)) {
            return passedElementPersit.getSome(id);
        }
        return null;
    }

    static set(id: string, value: PassedElement): void {
        passedElementPersit.set(id, value);
    }

    static contains(id: string): bool {
        return passedElementPersit.contains(id);
    }

    static delete(id: string): void {
        passedElementPersit.delete(id);
    }
}
