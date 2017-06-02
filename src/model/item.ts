import { JsonObject } from "./json-model";

export class Item extends JsonObject {
    public id: number;
    public name: string;
    public weight: number;
    public tags: string;

    constructor() {
        super();
    }

    public static sort(a: Item, b: Item) {
        if (a.name < b.name)
            return -1;
        else if (a.name > b.name)
            return 1;
        else
            return 0;
    }
}