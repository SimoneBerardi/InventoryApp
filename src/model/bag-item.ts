import { Item } from "./item";
import { Serializable, JsonableOld } from "./jsonable";

export class BagItem extends JsonableOld {
    public id: number;
    public itemId: number;
    public quantity: number;
    @Serializable(false)
    public item: Item;

    constructor(itemId: number, item: Item) {
        super();
        this.itemId = itemId;
        this.item = item;
        this.quantity = 1;
    }

    public get text() {
        let result = this.item.name;
        if (this.quantity > 1)
            result = this.quantity + " x " + result;
        return result;
    }
    public get weight() {
        return this.item.weight * this.quantity;
    }
}