import { Jsonable } from "../../shared/jsonable.model";
import { Item } from "../../items/item.model";

export class BagItem extends Jsonable {
  inventoryId: number;
  bagId: number;
  itemId: number;
  quantity: number;

  item: Item;

  constructor() {
    super(["inventoryId", "bagId", "itemId", "quantity"]);
  }

  get text() {
    return this.item.name + ((this.quantity > 1) ? (" x " + this.quantity) : "");
  }
  get weight() {
    return this.item.weight * this.quantity;
  }
}