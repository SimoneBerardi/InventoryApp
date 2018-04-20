import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Jsonable } from '../jsonable.model';

@Injectable()
export class StorageProvider {
  constructor(
    private _storage: Storage,
  ) { }

  serialize(key: string, itemOrArray: Jsonable | Jsonable[]): Promise<void> {
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

  deserialize<T extends Jsonable>(key: string, type: { new(): T; }): Promise<T | T[]> {
    console.log("Deserializzo " + key);
    return this._storage.get(key).then(jsonOrArray => {
      let result = null;
      if (jsonOrArray instanceof Array) {
        result = new Array<T>();
        jsonOrArray.forEach(json => {
          let item = new type();
          item.fromJson(json);
          result.push(item);
        });
      } else if (jsonOrArray) {
        let item = new type();
        item.fromJson(jsonOrArray);
        result = item;
      }
      console.log("Deserializzato " + key, result);
      return Promise.resolve(result);
    });
  }

  remove(key: string) {
    return this._storage.remove(key);
  }
}
