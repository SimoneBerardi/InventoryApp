import { Money } from "./money.model";
import { BagItem } from "./bag-item.model";
import { Bag } from "./bag.model";
import { Data } from "../../shared/data.model";
import { DataProvider } from "../../shared/data-provider.model";
import { DataArray } from "../../shared/data-array.mode";

export class Inventory extends Data {
  characterId: number;
  defaultBagId: number;

  money: Money;
  bags: DataArray<Bag>;

  constructor(
    _provider: DataProvider<Inventory>,
  ) {
    super(
      _provider,
      [
        "characterId",
        "defaultBagId"
      ]
    );
  }

  get bagsWeight() {
    return this.bags.map(bag => bag.weight).reduce((a, b) => a + b, 0);
  }
  get carriedWeight() {
    return this.money.weight + this.bagsWeight;
  }
  get defaultBag() {
    return this.bags.find(bag => bag.id === this.defaultBagId);
  }

  deleteItem(itemId: number){
    let promises = [];
    this.bags.forEach(bag => {
      let bagItems = bag.items.filter(bagItem => bagItem.itemId === itemId);
      bagItems.delete();
    });
    return Promise.all(promises);
  }
  addBag(bag: Bag) {
    bag.inventoryId = this.id;
    this.bags.push(bag);
  }
  countItemQuantity(itemId: number) {
    let count = 0;
    this.bags.forEach(bag => {
      let bagItems = bag.items.filter(bagItem => bagItem.itemId === itemId);
      let bagCount = bagItems.map(bagItem => bagItem.quantity).reduce((a, b) => a + b, 0);
      count += bagCount;
    });
    return count;
  }

  //-- override --
  save(isDeep: boolean) {
    return super.save(isDeep).then(() => {
      if (!isDeep)
        return Promise.resolve();

      this.money.inventoryId = this.id;
      this.bags.forEach(bag => {
        bag.inventoryId = this.id;
      });
      return Promise.all([
        this.money.save(),
        this.bags.save(),
      ]).then(() => {
        return Promise.resolve();
      });
    });
  }
  delete() {
    return Promise.all([
      this.money.delete(),
      this.bags.delete(),
    ]).then(() => {
      return super.delete();
    });
  }
}