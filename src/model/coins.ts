import { JsonObject } from "./json-model";

export class Coins extends JsonObject {
    Copper: number = 0;
    Silver: number = 0;
    Electrum: number = 0;
    Gold: number = 0;
    Platinum: number = 0;

    public get hasValue() {
        return this.Copper > 0 || this.Silver > 0 || this.Electrum > 0 || this.Gold > 0 || this.Platinum > 0;
    }
    public get weight() {
        return (this.Copper + this.Silver + this.Electrum + this.Gold + this.Platinum) / 50 * 0.5;
    }
}