import { JsonObject } from "./json-model";

export class Item extends JsonObject {
    public id: number;
    public name: string;
    public weight: number;
    public tags: string;

    constructor(){
        super();
    }
}