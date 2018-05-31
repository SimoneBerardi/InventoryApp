import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from 'ionic-angular';
import { StorageProvider } from './storage.provider';
import { UtilityProvider } from './utility.provider';
import { Migration } from '../model/migration.model';
import { MemoryProvider } from '../memory-provider.model';

@Injectable()
export class MigrationProvider extends MemoryProvider<Migration>{
  private _migrations: string[] = [
    "2.0.0",
  ];

  constructor(
    _events: Events,
    _utility: UtilityProvider,
    _storage: StorageProvider,
    private _http: HttpClient,
  ) {
    super(
      _events,
      _utility,
      Migration,
      _storage,
      "inventoryApp_migrations",
    );
  }

  getByVersion(version: string) {
    return this.find(migration => migration.version === version);
  }

  load() {
    return super.load().then(() => {
      let migrations = this._migrations.map(migration => this._applyMigration(migration));
      return migrations.reduce((prev, current) => {
        return prev.then(() => current)
      }, Promise.resolve());
    });
  }

  private _applyMigration(version: string) {
    let currentMigration = null;
    return this.getByVersion(version).then(migration => {
      currentMigration = migration;
      if (!migration || migration.isComplete)
        return Promise.resolve();

      switch (version) {
        case "2.0.0":
          return this._applyMigration_200000();
      }
    }).then(() => {
      if (!currentMigration) {
        let migration = this.create();
        migration.version = version;
        migration.isComplete = true;
        migration.dateCompleted = new Date();
        return this.add(migration);
      } else
        return Promise.resolve();
    });
  }
  private _applyMigration_200000() {
    let language = "it";
    return Promise.all([
      this._storage.get("inventoryApp_options"),
      this._storage.get("inventoryApp_customItems"),
      this._storage.get("inventoryApp_characters"),
    ]).then(([oldOptions, oldCustomItems, oldCharacters]) => {
      return Promise.all([
        oldOptions,
        oldCustomItems,
        oldCharacters,
        this._http.get("assets/items." + language + ".json").toPromise(),
      ]);
    }).then(([oldOptions, oldCustomItems, oldCharacters, oldItems]) => {
      let oldItemsArray = oldItems["items"] as any[];
      if (oldCustomItems)
        oldItemsArray = oldItemsArray.concat(oldCustomItems);
      let promises = [];
      if (oldOptions) {
        let options = {
          language: oldOptions.language,
          units: 0,
          decimals: 2,
          themeId: 9,
        };
        promises.push(this._storage.set("inventoryApp_options", options));
      }

      if (oldCharacters) {
        oldCharacters = JSON.parse(oldCharacters);
        let characters = [];
        let inventories = [];
        let moneyArray = [];
        let bags = [];
        let bagItems = [];
        let items = [];

        let bagId = 1;
        let itemId = 1;
        let bagItemId = 1;

        oldCharacters.forEach((oldCharacter, index) => {
          let characterId = index + 1;
          let character = {
            id: characterId,
            name: oldCharacter.name,
            race: oldCharacter.race,
            className: oldCharacter.class,
            size: 1,
            strength: oldCharacter.strength,
            edition: 1,
          }
          characters.push(character);

          let inventory = {
            id: characterId,
            characterId: characterId,
          }
          inventories.push(inventory);

          let money = {
            id: inventory.id,
            inventoryId: inventory.id,
            copper: oldCharacter.coins.Copper,
            silver: oldCharacter.coins.Silver,
            electrum: oldCharacter.coins.Electrum,
            gold: oldCharacter.coins.Gold,
            platinum: oldCharacter.coins.Platinum,
          }
          moneyArray.push(money);

          oldCharacter.bags.forEach((oldBag, index) => {
            let bag = {
              id: bagId,
              inventoryId: inventory.id,
              name: oldBag.name,
              bagWeight: oldBag.weight,
              hasLimitedCapacity: oldBag.isFixedWeight,
              capacity: oldBag.capacity,
              ignoreItemsWeight: oldBag.isFixedWeight,
              isProtected: oldBag.isEquipped
            }
            bags.push(bag);
            bagId++;

            oldBag.items.forEach(oldBagItem => {
              let bagItem = {
                id: bagItemId,
                inventoryId: inventory.id,
                bagId: bag.id,
                quantity: oldBagItem.quantity,
              }

              let item = items.find(o => o.id == oldBagItem.itemId);
              if (!item) {
                let oldItem = oldItemsArray.find(o => o.id == oldBagItem.itemId);
                item = {
                  id: itemId,
                  name: oldItem.name,
                  description: oldItem.description,
                  weight: oldItem.weight,
                  //TODO
                  category: 2,
                };
                items.push(item);
                itemId++;
              }
              bagItem["itemId"] = item.id;
              bagItems.push(bagItem);
              bagItemId++;
            });
          });
        });
        promises.push(this._storage.set("inventoryApp_items", items));
        promises.push(this._storage.set("inventoryApp_characters", characters));
        promises.push(this._storage.set("inventoryApp_inventory", inventories));
        promises.push(this._storage.set("inventoryApp_money", moneyArray));
        promises.push(this._storage.set("inventoryApp_bags", bags));
        promises.push(this._storage.set("inventoryApp_bagItems", bagItems));
      }
      return Promise.all(promises);
    }).then(() => {
      return Promise.resolve();
    });
  }
}