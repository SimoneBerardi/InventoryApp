import { Data } from "./data.model";
import { Events } from 'ionic-angular';
import { UtilityProvider } from "./providers/utility.provider";
import { DataArray } from "./data-array.model";

export abstract class DataProvider<T extends Data> {
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

  abstract add(item: T): Promise<void>;

  abstract addMany(items: T[]): Promise<void>;

  abstract modify(id: number, newItem: T): Promise<void>;

  abstract delete(id: number): Promise<void>;

  abstract deleteMany(ids: number[]): Promise<void>;
}