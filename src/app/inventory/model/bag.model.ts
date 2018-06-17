import { Data } from "../../shared/data.model";
import { BagItem } from "./bag-item.model";
import { Item } from "../../items/item.model";
import { DataProvider } from "../../shared/data-provider.model";
import { DataArray } from "../../shared/data-array.model";

export class Bag extends Data {
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

  items: DataArray<BagItem>;

  constructor(
    _provider: DataProvider<Bag>,
  ) {
    super(
      _provider,
      [
        "inventoryId",
        "name",
        "bagWeight",
        "hasLimitedCapacity",
        "capacity",
        "ignoreItemsWeight",
        "image",
        "isProtected",
      ]
    );
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

  //-- bagItems --
  addItemQuantity(item: Item, quantity: number) {
    let bagItem = this.items.find(o => o.itemId === item.id);
    if (bagItem) {
      bagItem.quantity += quantity;
      bagItem.item.totalQuantity += quantity;
    } else {
      bagItem = this.items.addNew();
      bagItem.itemId = item.id;
      bagItem.inventoryId = this.inventoryId;
      bagItem.bagId = this.id;
      bagItem.quantity = quantity;
      bagItem.item = item;
      bagItem.item.totalQuantity += quantity;
    }
    return bagItem.save();
  }
  modifyBagItemQuantity(bagItem: BagItem, quantity: number, isNegative: boolean) {
    if (isNegative && quantity > bagItem.quantity)
      throw new Error("QuantitàInsufficiente");

    if (isNegative && quantity === bagItem.quantity) {
      bagItem.quantity -= quantity;
      bagItem.item.totalQuantity -= quantity;
      this.items.splice(this.items.indexOf(bagItem), 1);
      return bagItem.delete();
    } else {
      if (isNegative) {
        bagItem.quantity -= quantity;
        bagItem.item.totalQuantity -= quantity;
      }
      else {
        bagItem.quantity += quantity;
        bagItem.item.totalQuantity += quantity;
      }
      return bagItem.save();
    }
  }
  //-- items --
  deleteItem(itemId: number) {
    let bagItems = this.items.filter(bagItem => bagItem.itemId === itemId);
    bagItems.forEach(bagItem => {
      this.items.splice(this.items.indexOf(bagItem), 1);
    });
    return Promise.all(bagItems.map(bagItem => bagItem.delete()));
  }

  //-- override --
  save(isDeep: boolean = false) {
    return super.save(isDeep).then(() => {
      if (!isDeep)
        return Promise.resolve();

      this.items.forEach(bagItem => {
        bagItem.inventoryId = this.inventoryId;
      });
      return this.items.save();
    });
  }
  delete() {
    return this.items.delete().then(() => {
      return super.delete();
    });
  }
}