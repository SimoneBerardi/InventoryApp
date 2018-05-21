import { Jsonable } from "../../shared/jsonable.model";
import { BagItem } from "./bag-item.model";
import { Item } from "../../items/item.model";

export class Bag extends Jsonable {
  inventoryId: number;
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
  /**
   * Indica se è possibile modificare la borsa
   */
  isProtected: boolean;

  items: BagItem[] = [];

  constructor() {
    super([
      "inventoryId",
      "name",
      "bagWeight",
      "hasLimitedCapacity",
      "capacity",
      "ignoreItemsWeight",
      "image",
      "isProtected",
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

  getBagItemByItemId(itemId: number) {
    return this.items.find(o => o.itemId === itemId);
  }
}