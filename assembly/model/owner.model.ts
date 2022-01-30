import { Context } from "near-sdk-as";

@nearBindgen
class Owner {
    private forms: Set<string>;
    private events: Set<string>;
    private id: string;

    constructor() {
        this.id = Context.sender;
    }
}
