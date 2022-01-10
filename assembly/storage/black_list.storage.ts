import { PersistentUnorderedMap } from "near-sdk-as";

const blackListPersit = new PersistentUnorderedMap<string, string>("bLP");

export class BlackListStorage {
    static get(id: string): string[] {
        if (blackListPersit.contains(id)) {
            let black_list_serialized = blackListPersit.getSome(id);
            if (black_list_serialized == "") {
                return new Array<string>(0);
            }

            const black_lists = black_list_serialized.split(";");
            return black_lists;
        }
        return new Array<string>(0);
    }

    static set(id: string, value: string): void {
        if (blackListPersit.contains(id)) {
            let black_list_serialized = blackListPersit.getSome(id);

            const black_lists = black_list_serialized.split(";");
            const uIndex = black_lists.indexOf(value);
            if (uIndex != -1) {
                black_lists.push(value);
                black_list_serialized = black_lists.join(";");
                blackListPersit.set(id, black_list_serialized);
            }
        } else {
            blackListPersit.set(id, value);
        }
    }

    static sets(id: string, value: string): void {
        blackListPersit.set(id, value);
    }

    static contains(id: string, value: string): bool {
        if (blackListPersit.contains(id)) {
            let black_list_serialized = blackListPersit.getSome(id);

            const black_lists = black_list_serialized.split(";");
            const uIndex = black_lists.indexOf(value);
            if (uIndex != -1) {
                return true;
            }
        }
        return false;
    }

    static delete(id: string, value: string): void {
        if (blackListPersit.contains(id)) {
            let black_list_serialized = blackListPersit.getSome(id);

            const black_lists = black_list_serialized.split(";");
            const uIndex = black_lists.indexOf(value);
            if (uIndex != -1) {
                black_lists.splice(uIndex, 1);
                black_list_serialized = black_lists.join(";");
                blackListPersit.set(id, black_list_serialized);
            }
        }
    }

    static deletes(id: string): void {
        blackListPersit.delete(id);
    }
}
