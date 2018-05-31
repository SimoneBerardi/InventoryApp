import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Data } from '../data.model';
import { DataProvider } from '../data-provider.model';

@Injectable()
export class StorageProvider {
  constructor(
    private _storage: Storage,
  ) { }

  serialize(key: string, itemOrArray: Data | Data[]): Promise<void> {
    console.log("Serializzo " + key + "...");
    let json = null;
    if (itemOrArray instanceof Array) {
      json = [];
      itemOrArray.forEach(item => {
        json.push(item.toJson());
      });
    } else
      json = itemOrArray.toJson();
    return this._storage.set(key, json).then(() => {
      console.log("Serializzato " + key, json);
      return Promise.resolve();
    })
  }

  deserialize<T extends Data>(key: string, dataProvider: DataProvider<T>): Promise<T | T[]> {
    console.log("Deserializzo " + key);
    return this._storage.get(key).then(jsonOrArray => {
      let result = null;
      if (jsonOrArray instanceof Array) {
        result = [];
        jsonOrArray.forEach(json => {
          let item = dataProvider.create();
          item.fromJson(json);
          result.push(item);
        });
      } else if (jsonOrArray) {
        let item = dataProvider.create();
        item.fromJson(jsonOrArray);
        result = item;
      }
      console.log("Deserializzato " + key, result);
      return Promise.resolve(result as T[]);
    });
  }

  remove(key: string) {
    return this._storage.remove(key);
  }

  get(key: string) {
    return this._storage.get(key);
  }

  set(key: string, value: any) {
    return this._storage.set(key, value);
  }
}
