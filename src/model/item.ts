import { JsonObject } from "./json-model";

export class Item extends JsonObject {
    public id: number;
    public name: string;
    public weight: number;
    public tags: string;
    public description: string;
    public isCustom: boolean;

    constructor(isCustom?: boolean) {
        super();
        if (isCustom)
            this.isCustom = true;
    }

    public static sort(a: Item, b: Item) {
        if (a.name.toLowerCase() < b.name.toLowerCase())
            return -1;
        else if (a.name.toLowerCase() > b.name.toLowerCase())
            return 1;
        else
            return 0;
    }
}