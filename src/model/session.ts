import { JsonObject } from "./json-model";
import { Character } from "./character";
import { Bag } from "./bag";

export class Session extends JsonObject {
    public character: Character = new Character();
}