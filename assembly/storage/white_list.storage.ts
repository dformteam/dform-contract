import { PersistentUnorderedMap } from "near-sdk-as";

const whiteListPersit = new PersistentUnorderedMap<string, string>("bLP");

export class WhiteListStorage {
    static get(id: string): string[] {
        if (whiteListPersit.contains(id)) {
            let white_list_serialized = whiteListPersit.getSome(id);
            if (white_list_serialized == "") {
                return new Array<string>(0);
            }

            const white_lists = white_list_serialized.split(";");
            return white_lists;
        }
        return new Array<string>(0);
    }

    static set(id: string, value: string): void {
        if (whiteListPersit.contains(id)) {
            let white_list_serialized = whiteListPersit.getSome(id);

            const white_lists = white_list_serialized.split(";");
            const uIndex = white_lists.indexOf(value);
            if (uIndex != -1) {
                white_lists.push(value);
                white_list_serialized = white_lists.join(";");
                whiteListPersit.set(id, white_list_serialized);
            }
        } else {
            whiteListPersit.set(id, value);
        }
    }

    static sets(id: string, value: string): void {
        whiteListPersit.set(id, value);
    }

    static contains(id: string, value: string): bool {
        if (whiteListPersit.contains(id)) {
            let white_list_serialized = whiteListPersit.getSome(id);
            if (white_list_serialized == "") {
                return true;
            }

            const white_lists = white_list_serialized.split(";");
            const uIndex = white_lists.indexOf(value);
            if (uIndex != -1) {
                return false;
            }
        }
        return true;
    }

    static delete(id: string, value: string): void {
        if (whiteListPersit.contains(id)) {
            let white_list_serialized = whiteListPersit.getSome(id);

            const white_lists = white_list_serialized.split(";");
            const uIndex = white_lists.indexOf(value);
            if (uIndex != -1) {
                white_lists.splice(uIndex, 1);
                white_list_serialized = white_lists.join(";");
                whiteListPersit.set(id, white_list_serialized);
            }
        }
    }

    static deletes(id: string): void {
        whiteListPersit.delete(id);
    }
}
