import { Money } from "./money.model";
import { BagItem } from "./bag-item.model";
import { Bag } from "./bag.model";
import { Jsonable } from "../../shared/jsonable.model";

export class Inventory extends Jsonable {
  characterId: number;

  money: Money = new Money();
  bags: Bag[] = [];

  constructor() {
    super(["characterId"]);
  }

  get bagsWeight() {
    return this.bags.map(bag => bag.weight).reduce((a, b) => a + b, 0);
  }
  get carriedWeight() {
    return this.money.weight + this.bagsWeight;
  }
}