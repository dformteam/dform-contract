import { u128 } from "near-sdk-as";
import { ComponentFee } from "../helper/calculation.helper";
export const NEAR_FEE_PER_BYTE = "10000000000000000000";
export const DEFAULT_STORAGE_FEE = "10000000000000000000000"; // 0.01 NEAR

@nearBindgen
export default class Base {
    public storageFee: u128 = u128.from(DEFAULT_STORAGE_FEE);
    // public componentStorageFee: ComponentFee[] = [];
    constructor() { }

    get_storage_fee(): u128 {
        return this.storageFee;
    }

    cal_storage_fee(key: string, value: string): u128 {
        let num_of_byte: i32 = String.UTF8.byteLength(key) + 10 + String.UTF8.byteLength(value);
        // let current_component_fee = u128.Zero;
        // for (let i = 0; i < this.componentStorageFee.length; i++) {
        //     current_component_fee = u128.add(current_component_fee, this.componentStorageFee[i].value);
        // }
        // let current_fee = u128.add(u128.mul(u128.from(num_of_byte), u128.from(NEAR_FEE_PER_BYTE)), current_component_fee);
        let current_fee = u128.mul(u128.from(num_of_byte), u128.from(NEAR_FEE_PER_BYTE));

        if (u128.gt(current_fee, this.storageFee)) {
            this.storageFee = current_fee;
        }
        return this.storageFee;
    }
}