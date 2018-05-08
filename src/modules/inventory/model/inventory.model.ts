import { Money } from "./money.model";
import { BagItem } from "./bag-item.model";
import { Bag } from "./bag.model";

export class Inventory {
  characterId: number;
  money: Money = new Money();
  equipped: BagItem[] = [];
  bags: Bag[] = [];

  get equippedWeight() {
    return this.equipped.map(item => item.weight).reduce((a, b) => a + b, 0);
  }
  get bagsWeight() {
    return this.bags.map(bag => bag.weight).reduce((a, b) => a + b, 0);
  }
  get carriedWeight(){
    return this.money.weight + this.equippedWeight + this.bagsWeight;
  }

  addBagItem(bagItem: BagItem, bagId: number) {
    bagItem.bagId = bagId;

    if (bagId === -1)
      this.equipped.push(bagItem);
    else {
      let newBag = this.bags.find(bag => bag.id === bagId);
      if (!newBag)
        throw new Error("NonTrovato");

      newBag.items.push(bagItem);
    }
  }

  deleteBagItem(bagItem: BagItem) {
    if (bagItem.isEquipped) {
      this.equipped.splice(this.equipped.indexOf(bagItem), 1);
    } else {
      let bag = this.bags.find(bag => bag.id === bagItem.bagId);
      bag.deleteBagItem(bagItem.id);
    }
  }
}