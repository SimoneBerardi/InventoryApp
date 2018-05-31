import { Data } from "./data.model";
import { Events } from 'ionic-angular';
import { StorageProvider } from "./providers/storage.provider";
import { UtilityProvider } from "./providers/utility.provider";
import { DataArray } from "./data-array.mode";

export abstract class DataProvider<T extends Data> {
  protected _eventNames = {
    add: "add",
    modify: "modify",
    delete: "delete"
  };
  protected _testItems: any[] = [];

  constructor(
    protected _events: Events,
    protected _utility: UtilityProvider,
    protected _type: new (provider: DataProvider<T>) => T,
  ) { }

  abstract getAll(): Promise<DataArray<T>>;

  abstract getById(id: number): Promise<T>;

  abstract create(): T;

  abstract createArray(items?: T[]): DataArray<T>;

  add(item: T): Promise<void> {
    this._publishEvent(this._eventNames.add, item.id);
    return Promise.resolve();
  }
  addMany(items: T[]): Promise<void> {
    items.forEach(item => {
      this._publishEvent(this._eventNames.add, item.id);
    });
    return Promise.resolve();
  }
  modify(id: number, newItem: T): Promise<void> {
    this._publishEvent(this._eventNames.modify, id);
    return Promise.resolve();
  }
  delete(id: number): Promise<void> {
    this._publishEvent(this._eventNames.delete, id);
    return Promise.resolve();
  }
  deleteMany(ids: number[]): Promise<void> {
    ids.forEach(id => {
      this._publishEvent(this._eventNames.delete, id);
    });
    return Promise.resolve();
  }

  protected _publishEvent(name: string, data: any) {
    let eventName = this._type.name + ":" + name;
    this._events.publish(eventName, data);
  }
}