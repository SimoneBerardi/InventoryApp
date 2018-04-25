import { Money } from "./money.model";
import { BagItem } from "./bag-item.model";
import { Bag } from "./bag.model";

export class Inventory{
  money: Money = new Money();
  equipped: BagItem[] = [];
  bags: Bag[] = [];
}