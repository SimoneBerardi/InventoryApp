import { Money } from "./money.model";
import { BagItem } from "./bag-item.model";
import { Bag } from "./bag.model";

export class Inventory{
  money: Money = new Money();
  equipped: BagItem[] = [];
  bags: Bag[] = [];

  equippedWeight(){
    return this.equipped.map(item => item.weight).reduce((a, b) => a + b, 0);
  }
}