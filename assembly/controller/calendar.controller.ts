import { Context } from "near-sdk-as";
import Calendar from "../model/calendar.model";
import { CalendarStorage } from "../storage/calendar.storage";

export function add_calendar(): bool {
    const sender = Context.sender;
    if(!CalendarStorage.contains(sender)) {
        let calendar
    }
}