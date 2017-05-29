import { JsonObject, JsonArray } from "./json-model";
import { Bag } from "./bag";
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
        if (name) {
            this.name = name;
            this.race = "Razza";
            this.class = "Classe";
            this.strength = 10;
            let bag = this.addBag("Equipaggiato");
            bag.isEquipped = true;
            bag = this.addBag("Zaino");
            bag.weight = 2.5;
        }
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
    public get carriedWeight() {
        return this.bags.map(bag => bag.totalWeight).reduce((a, b) => a + b, 0);
    }
    public get isEncumbered() {
        return this.carriedWeight > this.encumberedValue;
    }
    public get isHeavilyEncumbered() {
        return this.carriedWeight > this.heavilyEncumberedValue;
    }
    public get isOverMaxCarry() {
        return this.carriedWeight > this.maxCarryValue;
    }
    public get encumberedValue() {
        return parseFloat((this.strength * 5 * 0.453592).toFixed(2));
    }
    public get heavilyEncumberedValue() {
        return parseFloat((this.strength * 10 * 0.453592).toFixed(2));
    }
    public get maxCarryValue() {
        return parseFloat((this.strength * 15 * 0.453592).toFixed(2));
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
        this.bags.splice(this.bags.indexOf(bag), 1);
    }

    private _generateBagId() {
        let result = 1;
        if (this.bags.length > 0)
            result = Math.max.apply(this, this.bags.map(bag => bag.id)) + 1;
        return result;
    }
}