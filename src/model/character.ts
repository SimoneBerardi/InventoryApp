import { JsonObject } from "./json-model";
import { Bag } from "./bag";
import { BagItem } from "./bagItem";

export class Character extends JsonObject {
    public id: number;
    public name: string;
    public race: string;
    public class: string;
    public strength: number;
    public image: string;

    public bags: Bag[];

    constructor(name?: string) {
        super();
        if (name)
            this.name = name;
    }

    public get descritpion() {
        return this.class + " " + this.race;
    }
}