import { Jsonable } from "../../shared/jsonable.model";

export class BagItem extends Jsonable {
  characterId: number;
  itemId: number;
  bagId: number;
  name: string;
  description: string;
  itemWeight: number;
  quantity: number;

  constructor() {
    super(["characterId", "itemId", "bagId", "name", "description", "itemWeight", "quantity"]);
  }

  get text() {
    return this.name + ((this.quantity > 1) ? (" x " + this.quantity) : "");
  }
  get weight() {
    return this.itemWeight * this.quantity;
  }
}