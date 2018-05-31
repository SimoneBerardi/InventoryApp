import { Data } from "../../shared/data.model";
import { Item } from "../../items/item.model";
import { DataProvider } from "../../shared/data-provider.model";

export class BagItem extends Data {
  inventoryId: number;
  bagId: number;
  itemId: number;
  quantity: number;

  item: Item;

  constructor(
    _provider: DataProvider<BagItem>
  ) {
    super(
      _provider,
      [
        "inventoryId",
        "bagId",
        "itemId",
        "quantity"
      ]
    );
  }

  get text() {
    return this.item.name + ((this.quantity > 1) ? (" x " + this.quantity) : "");
  }
  get weight() {
    return this.item.weight * this.quantity;
  }
}