import { PersistentUnorderedMap } from "near-sdk-as";
import PublishForm from "../model/publish_form.model";

const userPublishFormIndexPersistent = new PersistentUnorderedMap<string, u32>("uPFIP");
const userPublishFormPersistent = new PersistentUnorderedMap<string, string>("uPFP");
const publishFormPersistent = new PersistentUnorderedMap<string, PublishForm>("pFP");

export class PublishFormStorage {
    static get(userId: string, formId: string): PublishForm | null {
        const id = `${userId}_${formId}`;
        if (publishFormPersistent.contains(id)) {
            return publishFormPersistent.getSome(id);
        }
        return null;
    }

    static gets(userId: string): PublishForm[] {
        if (userPublishFormPersistent.contains(userId)) {
            const userFormSerialized = userPublishFormPersistent.getSome(userId);
            if (userFormSerialized == "") {
                return new Array<PublishForm>(0);
            }
            const userForms = userFormSerialized.split(";");
            const userForms_size = userForms.length;
            const publishForms = new Set<PublishForm>();
            for (let i = 0; i < userForms_size; i++) {
                const pfId = `${userId}_${userForms[i]}`;
                if (publishFormPersistent.contains(pfId)) {
                    publishForms.add(publishFormPersistent.getSome(pfId));
                }
            }

            return publishForms.values();
        }
        return new Array<PublishForm>(0);
    }

    static set(userId: string, value: PublishForm): void {
        const formId = value.get_id();
        const id = `${userId}_${formId}`;
        if (!publishFormPersistent.contains(id)) {
            let userFormSerialized = formId;
            if (userPublishFormPersistent.contains(userId)) {
                userFormSerialized = userPublishFormPersistent.getSome(userId);
                const userForms = userFormSerialized.split(";");
                const lastIndex = userForms.length;
                userPublishFormIndexPersistent.set(id, lastIndex);
                userForms.push(formId);
                userFormSerialized = userForms.join(";");
            }
            userPublishFormPersistent.set(userId, userFormSerialized);
        }

        publishFormPersistent.set(id, value);
    }

    static delete(userId: string, formId: string): void {
        const id = `${userId}_${formId}`;
        let index = -1;
        
        if (userPublishFormIndexPersistent.contains(id)) {
            index = userPublishFormIndexPersistent.getSome(id);
            userPublishFormIndexPersistent.delete(id);
        }

        if (index != -1 && userPublishFormPersistent.contains(userId)) {
            let userFormSerialized = userPublishFormPersistent.getSome(userId);
            const userForms = userFormSerialized.split(";");
            userForms.splice(index, 1);
            userFormSerialized = userForms.join(";");
            userPublishFormPersistent.set(userId, userFormSerialized);
        }

        if (publishFormPersistent.contains(id)) {
            publishFormPersistent.delete(id);
        }
    }
}
