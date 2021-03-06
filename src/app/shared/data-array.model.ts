import { Data } from "./data.model";
import { DataProvider } from "./data-provider.model";

export class DataArray<T extends Data> extends Array<T> {
  constructor(
    protected _provider: DataProvider<T>,
    items?: T[]
  ) {
    super();
    Object.setPrototypeOf(this, DataArray.prototype);
    this.push(...items);
  }

  filter(callbackfn: (value: T, index: number, array: DataArray<T>) => any, thisArg?: any): DataArray<T> {
    return new DataArray<T>(this._provider, super.filter(callbackfn));
  }

  addNew(): T {
    let newItem = this._provider.create();
    this.push(newItem);
    return newItem;
  }
  save(): Promise<void> {
    let addedItems = this.filter(item => item.id === undefined);
    return this._provider.addMany(addedItems);
  }
  delete(): Promise<void> {
    let validItems = this.filter(item => item.id !== undefined);
    return this._provider.deleteMany(validItems.map(item => item.id));
  }
}