import { JsonObject } from "./json-model";
import { Character } from "./character";
import { BagItem } from "./bag-item";

export class Session extends JsonObject {
    public character: Character = new Character();
    public selectedBagItem: BagItem = new BagItem();
}