import { Data } from "./data.model";
import { Events } from 'ionic-angular';
import { StorageProvider } from "./providers/storage.provider";
import { UtilityProvider } from "./providers/utility.provider";
import { DataProvider } from "./data-provider.model";
import { DataArray } from "./data-array.mode";

export class MemoryProvider<T extends Data> extends DataProvider<T> {
  private _list: DataArray<T> = new DataArray<T>(this);
  private isTransactionActive: boolean;

  constructor(
    _events: Events,
    _utility: UtilityProvider,
    _type: new (provider: DataProvider<T>) => T,
    protected _storage: StorageProvider,
    protected _storageKey: string,
  ) {
    super(
      _events,
      _utility,
      _type
    );
  }

  get length() {
    return this._list.length;
  }

  getAll(): Promise<DataArray<T>> {
    return Promise.resolve(this._list);
  }
  getById(id: number): Promise<T> {
    return Promise.resolve(this._list.find(o => o.id === id));
  }
  create(): T {
    return new this._type(this);
  }
  createArray(items?: T[]): DataArray<T> {
    return new DataArray<T>(this, items);
  }
  add(item: T): Promise<void> {
    return Promise.resolve().then(() => {
      item.id = this._utility.generateListId(this._list);
      this._list.push(item);
      if (!this.isTransactionActive)
        return this.save();
      else
        return Promise.resolve();
    }).then(() => {
      return super.add(item);
    });
  }
  addMany(items: T[]) {
    this.openTransaction();
    let operations = items.map(item => this.add(item));
    return operations.reduce((prev, current) => {
      return prev.then(() => current)
    }, Promise.resolve()).then(() => {
      return super.addMany(items);
    }).then(() => {
      return this.closeTransaction();
    });
  }
  modify(id: number, newItem: T) {
    return this.getById(id).then(item => {
      if (!item)
        throw new Error("NonTrovato");

      newItem.id = item.id;
      Object.assign(item, newItem);
      if (!this.isTransactionActive)
        return this.save();
      else
        return Promise.resolve();
    }).then(() => {
      return super.modify(id, newItem);
    });
  }
  delete(id: number) {
    return this.getById(id).then(item => {
      if (!item)
        throw new Error("NonTrovato");

      this._list.splice(this._list.indexOf(item), 1);
      if (!this.isTransactionActive)
        return this.save();
      else
        return Promise.resolve();
    }).then(() => {
      return super.delete(id);
    });
  }
  deleteMany(ids: number[]) {
    this.openTransaction();
    let operations = ids.map(id => this.delete(id));
    return operations.reduce((prev, current) => {
      return prev.then(() => current)
    }, Promise.resolve()).then(() => {
      return super.deleteMany(ids);
    }).then(() => {
      return this.closeTransaction();
    });
  }

  //-- memory provider--
  openTransaction() {
    this.isTransactionActive = true;
  }
  closeTransaction() {
    return this.save();
  }
  filter(callbackfn: (value: T, index: number, array: DataArray<T>) => any, thisArg?: any): Promise<DataArray<T>> {
    return Promise.resolve(this.createArray(this._list.filter(callbackfn)));
  }
  find(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): Promise<T | undefined> {
    return Promise.resolve(this._list.find(predicate));
  }
  load() {
    return Promise.resolve().then(() => {
      if (this._utility.isDebug)
        return this.clear(false);
      else
        return Promise.resolve();
    }).then(() => {
      if (this._utility.isDebug) {
        this._loadTestItems();
        return this.save();
      }
      else
        return Promise.resolve();
    }).then(() => {
      return this._storage.deserialize(this._storageKey, this);
    }).then(list => {
      if (list)
        this._list = list as DataArray<T>;
      return Promise.resolve();
    });
  }
  save() {
    return this._storage.serialize(this._storageKey, this._list);
  }
  clear(clearCache: boolean = true) {
    if (clearCache)
      this._list = new DataArray<T>(this);
    return this._storage.remove(this._storageKey);
  }

  private _loadTestItems() {
    this._testItems.forEach(element => {
      let item = new this._type(this);
      Object.assign(item, element);
      this._list.push(item);
    });
  }
}