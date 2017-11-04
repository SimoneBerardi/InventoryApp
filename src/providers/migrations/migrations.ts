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
    // this._storage.get("inventoryApp_characters").then(value => {
    //   value.characters = JSON.parse(value.characters);
    //   this._storage.set("inventoryApp_characters", value);
    // });
    if (!this.migrations["2.0.0"]) {
      return this._storage.get("inventoryApp_characters").then(value => {
        return this._storage.set("inventoryApp_characters", { characters: JSON.parse(value) });
      }).then(() => {
        return this._storage.get("inventoryApp_customItems");
      }).then(value => {
        return this._storage.set("inventoryApp_items", { customItems: value });
      }).then(() => {
        return this._storage.remove("inventoryApp_customItems");
      }).then(() => {
        this.migrations["2.0.0"] = true;
        return this.save();
      });
    }
  }

}
