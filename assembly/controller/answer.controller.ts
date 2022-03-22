import { Context } from "near-sdk-core";
import { FormStorage } from "../storage/form.storage";

export function submit_answer(formId: string, rootId: string, lastRootId: string): bool {
    const sender = Context.sender;
    const form = FormStorage.get(formId);
    if (form == null) {
        return false;
    }

    return form.submit_answer(sender, rootId, lastRootId);
}
