import { Jsonable } from "./jsonable.model";
import { StorageProvider } from "./providers/storage.provider";
import { UtilityProvider } from "./providers/utility.provider";

export class DataProvider<T extends Jsonable> {
  protected _testItems: any[] = [];
  protected list: T[] = [];

  constructor(
    protected _storage: StorageProvider,
    protected _utility: UtilityProvider,
    protected _storageKey: string,
    protected _type: new () => T,
  ) { }

  selectAll() {
    return Promise.resolve(this.list);
  }

  select(id: number) {
    return Promise.resolve(this.list.find(o => o.id === id));
  }

  update(id: number, newItem: T) {
    return this.select(id).then(item => {
      if (!item)
        throw new Error("NonTrovato");

      newItem.id = item.id;
      Object.assign(item, newItem);
      return this.save();
    });
  }

  insert(item: T) {
    item.id = this._utility.generateListId(this.list);
    this.list.push(item);
    return this.save();
  }

  delete(id: number) {
    return this.select(id).then(item => {
      if (!item)
        throw new Error("NonTrovato");

      this.list.splice(this.list.indexOf(item), 1);
      return this.save();
    });
  }

  clear(clearCache: boolean = true) {
    if (clearCache)
      this.list = [];
    return this._storage.remove(this._storageKey);
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
      return this._storage.deserialize(this._storageKey, this._type);
    }).then(list => {
      if (list)
        this.list = list as T[];
      return Promise.resolve();
    });
  }

  save() {
    return this._storage.serialize(this._storageKey, this.list);
  }

  private _loadTestItems() {
    this._testItems.forEach(element => {
      let item = new this._type();
      Object.assign(item, element);
      this.list.push(item);
    });
  }
}