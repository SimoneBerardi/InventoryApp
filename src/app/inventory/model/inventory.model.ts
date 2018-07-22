import { Money } from "./money.model";
import { Bag } from "./bag.model";
import { Data } from "../../shared/data.model";
import { DataProvider } from "../../shared/data-provider.model";
import { DataArray } from "../../shared/data-array.model";

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

  //-- bags --
  getBag(bagId: number) {
    return this.bags.find(bag => bag.id === bagId);
  }
  addBag(bag: Bag) {
    bag.inventoryId = this.id;
    this.bags.push(bag);
  }
  removeBag(bag: Bag) {
    this.bags.splice(this.bags.indexOf(bag), 1);
  }
  //-- items --
  removeItem(itemId: number) {
    return Promise.all(this.bags.map(bag => bag.deleteItem(itemId)));
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
    let promises = [this.money.delete()];
    promises.concat(this.bags.map(bag => bag.delete()));
    return Promise.all(promises).then(() => {
      return super.delete();
    });
  }
}