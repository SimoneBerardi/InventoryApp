import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Events } from 'ionic-angular';
import { StorageProvider } from './storage.provider';
import { UtilityProvider } from './utility.provider';
import { Migration } from '../model/migration.model';
import { MemoryProvider } from '../memory-provider.model';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { InterfaceProvider } from './interface.provider';

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
    private _file: File,
    private _fileChooser: FileChooser,
    private _interface: InterfaceProvider,
  ) {
    super(
      _events,
      _utility,
      Migration,
      _storage,
      "inventoryApp_migrations",
      "Migration",
    );
  }

  getByVersion(version: string) {
    return this.find(migration => migration.version === version);
  }

  load() {
    return Promise.resolve().then(() => {
      return this.hasDataV1ToExport();
    }).then(hasDataV1ToExport => {
      if (hasDataV1ToExport)
        return this._interface.showAlert({
          title: "Backup",
          message: "BackupMessage"
        }).then(() => {
          return this.exportDataV1();
        }).then(() => {
          return this.clear();
        });
      else
        return Promise.resolve();
    }).then(() => {
      return super.load();
    }).then(() => {
      let migrations = this._migrations.map(migration => this._applyMigration(migration));
      return migrations.reduce((prev, current) => {
        return prev.then(() => current)
      }, Promise.resolve());
    });
  }

  hasDataV1ToExport() {
    return Promise.all([
      this._storage.get("inventoryApp_exportDatav1"),
      this._storage.get("inventoryApp_options"),
    ]).then(([exportDataV1, options]) => {
      return Promise.resolve(exportDataV1 == null && options != null);
    });
  }

  exportDataV1() {
    let path = this._file.externalRootDirectory + "Download/";
    let fileName = "AB_Backup_" + Math.floor(Date.now() / 1000) + ".txt";
    return this._getExportV1Json().then(json => {
      return this._file.writeFile(path, fileName, JSON.stringify(json));
    }).then(() => {
      return this._storage.set("inventoryApp_exportDatav1", true);
    }).then(() => {
      let message = "Backup completato e salvato nei download con nome: " + fileName;
      return this._interface.showAlert({
        title: "Backup",
        message: message,
      });
    }).catch(error => {
      console.log("Errore salvataggio dati: " + error);
    });
  }

  importDataV1() {
    return this._fileChooser.open().then(url => {
      return this._http.get(url).toPromise();
    }).then((json: ExportFileJson) => {
      return this._storage.clear().then(() => {
        return Promise.all([
          this._storage.set("inventoryApp_options", json.options),
          this._storage.set("inventoryApp_customItems", json.customItems),
          this._storage.set("inventoryApp_characters", json.characters),
        ]);
      })
    }).then(() => {
      location.assign(location.origin + location.pathname);
    });
  }

  private _getExportV1Json() {
    return Promise.all([
      this._storage.get("inventoryApp_options"),
      this._storage.get("inventoryApp_customItems"),
      this._storage.get("inventoryApp_characters"),
    ]).then(([options, customItems, characters]) => {
      let json: ExportFileJson = {
        options: options,
        customItems: customItems,
        characters: characters,
      };
      return Promise.resolve(json);
    });
  }
  private _applyMigration(version: string) {
    let currentMigration = null;
    return this.getByVersion(version).then(migration => {
      currentMigration = migration;
      if (currentMigration && currentMigration.isComplete)
        return Promise.resolve();
      else
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
          id: 1,
          language: oldOptions.language,
          units: 0,
          decimals: 2,
          themeId: 1,
        };
        promises.push(this._storage.set("inventoryApp_options", [options]));
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
            image: this._utility.images.character.avatars[0],
          }
          characters.push(character);

          let inventory = {
            id: characterId,
            characterId: characterId,
            defaultBagId: bagId,
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
              image: this._utility.images.inventory.bag,
              isProtected: oldBag.isEquipped,
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
                  characterId: character.id,
                  name: oldItem.name,
                  description: oldItem.description,
                  weight: oldItem.weight,
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

export interface ExportFileJson {
  options: any;
  customItems: any;
  characters: any;
}