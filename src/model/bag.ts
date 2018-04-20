import { BagItem } from "./bag-item";
import { Item } from "./item";
import { Deserializable, JsonableOld } from "./jsonable";

export class Bag extends JsonableOld {
    public id: number;
    public name: string;
    public weight: number;
    public isEquipped: boolean;
    public isFixedWeight: boolean;
    public capacity: number;
    @Deserializable(BagItem)
    public items: BagItem[] = new Array<BagItem>();

    constructor(name: string) {
        super();
        this.name = name;
        this.weight = 0;
        this.capacity = 0;
    }

    public get totalWeight() {
        let result = this.weight;
        if (!this.isFixedWeight)
            result += this.itemsWeight;
        return result;
    }
    public get isOverCapacity() {
        return this.isFixedWeight && this.itemsWeight > this.capacity;
    }
    public get itemsWeight() {
        return this.items.map(item => item.weight).reduce((a, b) => a + b, 0);
    }

    public addItem(item: Item, quantity: number = 1) {
        let oldBagItem = this.items.filter(bagItem => bagItem.item.id == item.id)[0];
        if (oldBagItem != null)
            oldBagItem.quantity += quantity;
        else {
            let bagItem = new BagItem(item.id, item);
            bagItem.id = this._generateBagItemId();
            bagItem.quantity = quantity;
            this.items.push(bagItem);
        }
    }
    public removeItem(bagItem: BagItem, quantity: number = 1) {
        if (quantity >= bagItem.quantity)
            this.items.splice(this.items.indexOf(bagItem), 1);
        else
            bagItem.quantity -= quantity;
    }

    private _generateBagItemId() {
        let result = 1;
        if (this.items.length > 0)
            result = Math.max.apply(this, this.items.map(item => item.id)) + 1;
        return result;
    }
}