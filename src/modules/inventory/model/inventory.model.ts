import { Money } from "./money.model";
import { BagItem } from "./bag-item.model";
import { Bag } from "./bag.model";

export class Inventory {
  characterId: number;
  money: Money = new Money();
  equipped: BagItem[] = [];
  bags: Bag[] = [];

  equippedWeight() {
    return this.equipped.map(item => item.weight).reduce((a, b) => a + b, 0);
  }

  deleteEquippedItem(id: number) {
    let bagItem = this.equipped.find(bagItem => bagItem.id === id);
    if (!bagItem)
      throw new Error("NonTrovato");

    this.equipped.splice(this.equipped.indexOf(bagItem), 1);
  }
}