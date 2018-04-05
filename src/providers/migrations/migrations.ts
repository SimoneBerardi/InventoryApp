import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Storageable } from '../../model/storageable';

@Injectable()
export class MigrationsProvider extends Storageable {

  migrations: any = {};

  constructor(
    _storage: Storage,
  ) {
    super(_storage, "inventoryApp_migrations");
  }

  migrate() {
    if (!this.migrations["2.0.0"]) {
      return this._migrate_02_00_00().then(() => {
        this.migrations["2.0.0"] = true;
        return this.save();
      });
    }
  }

  _migrate_02_00_00() {
    let promises = [];
    promises.push(this._storage.get("inventoryApp_characters"));
    promises.push(this._storage.get("inventoryApp_customItems"));
    return Promise.all(promises).then(([characters, customItems]) => {
      let promises = [];
      if (characters) {
        promises.push(this._storage.set("inventoryApp_characters", { characters: JSON.parse(characters) }))
      }
      if (customItems) {
        promises.push(this._storage.set("inventoryApp_items", { customItems: customItems }));
        promises.push(this._storage.remove("inventoryApp_customItems"));
      }
      return Promise.all(promises);
    });
  }

}
