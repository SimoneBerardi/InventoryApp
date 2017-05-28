import { Item } from "./item";
import { JsonObject } from "./json-model";

export class BagItem extends JsonObject {
    public id: number;
    public itemId: number;
    public quantity: number;
    public item: Item = new Item();

    constructor(item?: Item) {
        super();
        this.quantity = 1;
        if (item) {
            this.itemId = item.id;
            this.item = item;
        }
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

    public toJSON() {
        return Object.assign({}, this, {
            item: undefined
        });
    }
}