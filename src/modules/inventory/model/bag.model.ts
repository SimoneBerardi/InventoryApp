import { Jsonable } from "../../shared/jsonable.model";
import { BagItem } from "./bag-item.model";

export class Bag extends Jsonable {
  characterId: number;
  name: string;
  bagWeight: number;
  /**
   * Indica un contenitore con capacità limitata.
   */
  hasLimitedCapacity: boolean = false;
  /**
   * Valido in caso di capacità limitata
   */
  capacity: number = 0;
  /**
   * Indica se ignorare il peso degli oggetti contenuti nel peso totale.
   * Borsa magica
   */
  ignoreItemsWeight: boolean = false;
  image: string;

  items: BagItem[] = [];

  constructor() {
    super([
      "characterId",
      "name",
      "bagWeight",
      "hasLimitedCapacity",
      "capacity",
      "ignoreItemsWeight",
      "image"
    ]);
  }

  get itemsWeight() {
    return this.items.map(item => item.weight).reduce((a, b) => a + b, 0);
  }

  get weight() {
    return this.ignoreItemsWeight ? this.bagWeight : (this.bagWeight + this.itemsWeight);
  }

  get isOverCapacity() {
    return this.itemsWeight > this.capacity;
  }

  addBagItem(bagItem: BagItem) {
    let duplicateBagItem = null;
    let oldBagItems = this.items.filter(o => o.itemId === bagItem.itemId);
    oldBagItems.forEach(oldBagItem => {
      if (oldBagItem.isEqual(bagItem)) {
        oldBagItem.quantity += bagItem.quantity;
        duplicateBagItem = oldBagItem;
      }
    });
    if (duplicateBagItem === null)
      this.items.push(bagItem);
    return duplicateBagItem as BagItem;
  }

  modifyBagItemQuantity(bagItem: BagItem, quantity: number, isNegative: boolean) {
    if (isNegative && quantity === bagItem.quantity) {
      this.items.splice(this.items.indexOf(bagItem), 1);
      return true;
    } else {
      if (isNegative)
        bagItem.quantity -= quantity;
      else
        bagItem.quantity += quantity;
      return false;
    }
  }
}