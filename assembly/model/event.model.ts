import Base from "./base.model";

export enum EVENT_TYPE {
    ONLINE,
    INPERSON,
    ONLINE_AND_INPERSON
}

@nearBindgen
class Event extends Base {
    constructor(
        name: string,
        description: string,
        type: EVENT_TYPE,
        start_date: Date,
        due_date: Date,
        location: string,
    ) {
        super();
    }

    updateCoverImg(): bool {
        
    }
}

export default Event;