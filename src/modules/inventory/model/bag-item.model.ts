import { Jsonable } from "../../shared/jsonable.model";

export class BagItem extends Jsonable {
  id: number;
  characterId: number;
  bagId: number;
  name: string;
  description: string;
  itemWeight: number;
  quantity: number;

  constructor() {
    super(["id", "characterId", "bagId", "name", "description", "itemWeight", "quantity"]);
  }

  get text() {
    return this.name + ((this.quantity > 1) ? (" x " + this.quantity) : "");
  }
  get weight() {
    return this.itemWeight * this.quantity;
  }
}