import { JsonableOld } from "./jsonable";

export class Item extends JsonableOld {
    id: number;
    name: string;
    weight: number;
    tags: string;
    description: string;
    isCustom: boolean;

    static sort(a: Item, b: Item) {
        if (a.name.toLowerCase() < b.name.toLowerCase())
            return -1;
        else if (a.name.toLowerCase() > b.name.toLowerCase())
            return 1;
        else
            return 0;
    }
}