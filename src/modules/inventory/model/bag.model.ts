import { Jsonable } from "../../shared/jsonable.model";
import { BagItem } from "./bag-item.model";

export class Bag extends Jsonable {
  characterId: number;
  name: string;
  bagWeight: number;
  items: BagItem[] = [];
  /**
   * Indica un contenitore con capacità limitata.
   * Un contenitore di questo tipo ignora il peso degli oggetti fino a capacità massima e non permette di aggiungere altro oltre
   */
  hasLimitedCapacity: boolean = false;
  /**
   * Valido in caso di capacità limitata
   */
  capacity: number = 0;

  constructor() {
    super(["characterId", "name", "bagWeight", "capacity"]);
  }

  get itemsWeight() {
    return this.items.map(item => item.weight).reduce((a, b) => a + b, 0);
  }

  get weight() {
    return this.hasLimitedCapacity ? this.bagWeight : (this.bagWeight + this.itemsWeight);
  }

  get isOverCapacity() {
    return this.itemsWeight > this.capacity;
  }

  deleteBagItem(id: number) {
    let bagItem = this.items.find(bagItem => bagItem.id === id);
    if (!bagItem)
      throw new Error("NonTrovato");

    this.items.splice(this.items.indexOf(bagItem), 1);
  }
}