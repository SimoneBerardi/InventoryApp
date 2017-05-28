import { JsonObject, JsonArray } from "./json-model";
import { Bag } from "./bag";
import { BagItem } from "./bag-item";
import { Item } from "./item";

export class Character extends JsonObject {
    /** Serve per ottimizzare i salvataggi su db per singolo personaggio */
    public id: number;
    public name: string;
    public race: string;
    public class: string;
    public strength: number;
    public image: string;
    public bags: Bag[] = new JsonArray<Bag>(Bag);

    constructor(name?: string) {
        super();
        if (name)
            this.name = name;
        this.race = "Razza";
        this.class = "Classe";
        this.strength = 10;
        this.addBag("Equipaggiato");
        let bag = this.addBag("Zaino");
        bag.weight = 2.5;
    }

    public get description() {
        return this.class + " " + this.race;
    }
    public get equippedBag(): Bag {
        return this.bags.filter(bag => bag.isEquipped)[0];
    }
    public get backpack(): Bag {
        return this.bags.filter(bag => !bag.isEquipped)[0];
    }
    public get unequippedBags() {
        return this.bags.filter(bag => !bag.isEquipped);
    }

    public equipItem(bagItem: BagItem) {
        this.equippedBag.items.push(bagItem);
    }
    public getItemQuantity(item: Item) {
        let result = 0;
        this.bags.forEach(bag => {
            result += bag.items.filter(bagItem => bagItem.itemId == item.id).map(bagItem => bagItem.quantity).reduce((a, b) => a + b, 0)
        });
        return result;
    }
    public addBag(name: string) {
        let bag = new Bag(name);
        bag.id = this._generateBagId();
        this.bags.push(bag);
        return bag;
    }
    public removeBag(bag: Bag) {
        this.bags.splice(this.bags.indexOf(bag));
    }

    private _generateBagId() {
        let result = 1;
        if (this.bags.length > 0)
            result = Math.max.apply(this.bags.map(bag => bag.id)) + 1;
        return result;
    }
}