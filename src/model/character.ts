import { Bag } from "./bag";
import { Item } from "./item";
import { Coins } from "./coins";
import { Deserializable, Jsonable } from "./jsonable";

export class Character extends Jsonable {
    /** Serve per ottimizzare i salvataggi su db per singolo personaggio */
    id: number;
    name: string;
    race: string;
    class: string;
    strength: number;
    image: string;
    @Deserializable(Bag)
    bags: Bag[] = new Array<Bag>();
    @Deserializable(Coins)
    coins: Coins = new Coins();

    constructor(name: string, race: string, classValue: string) {
        super();
        this.name = name;
        this.race = race;
        this.class = classValue;
        this.strength = 10;
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
        return this.bags.map(bag => bag.totalWeight).reduce((a, b) => a + b, 0) + this.coins.weight;
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