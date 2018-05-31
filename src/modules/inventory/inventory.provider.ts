import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { StorageProvider } from '../shared/providers/storage.provider';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { Inventory } from './model/inventory.model';
import { MoneyProvider } from './money.provider';
import { BagProvider } from './bag.provider';
import { BagItemProvider } from './bag-item.provider';
import { Money } from './model/money.model';
import { Bag } from './model/bag.model';
import { BagItem } from './model/bag-item.model';
import { ItemProvider, ItemInventoryAction } from '../items/item.provider';
import { Item } from '../items/item.model';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';
import { MemoryProvider } from '../shared/memory-provider.model';


@Injectable()
export class InventoryProvider extends MemoryProvider<Inventory>{
  //Cache pubblica da utilizzare per la barra inventario
  inventory: Inventory;

  constructor(
    _events: Events,
    _utility: UtilityProvider,
    _storage: StorageProvider,
    private _items: ItemProvider,
    private _money: MoneyProvider,
    private _bagItems: BagItemProvider,
    private _bags: BagProvider,
  ) {
    super(
      _events,
      _utility,
      Inventory,
      _storage,
      "inventoryApp_inventory",
    );

    this._testItems = [
      {
        id: 1,
        characterId: 1,
        defaultBagId: 2,
      },
      {
        id: 2,
        characterId: 2,
        defaultBagId: 4,
      }
    ]
  }

  get carriedWeightClass() {
    let result = "not-encumbered";
    if (this.inventory.carriedWeight > this._utility.session.encumberedValue)
      result = "encumbered";
    if (this.inventory.carriedWeight > this._utility.session.heavilyEncumberedValue)
      result = "heavily-encumbered";
    if (this.inventory.carriedWeight > this._utility.session.maxCarryValue)
      result = "over-max-carry";
    return result;
  }

  getFromSession() {
    return Promise.resolve(this.inventory);
  }
  loadByCharacterId(characterId: number) {
    return this._getByCharacterId(this._utility.session.loadedCharacterId).then(inventory => {
      return Promise.all([
        inventory,
        this._money.getByInventoryId(inventory.id),
        this._bags.getByInventoryId(inventory.id),
        this._bagItems.getByInventoryId(inventory.id),
      ]);
    }).then(([inventory, money, bags, bagItems]) => {
      this.inventory = inventory;
      inventory.money = money;
      bags.forEach(bag => {
        bag.items = bagItems.filter(bagItem => bagItem.bagId === bag.id);
      });
      inventory.bags = this._bags.createArray(bags);

      let promises = [];
      bagItems.forEach(bagItem => {
        promises.push(this._items.getById(bagItem.itemId).then(item => {
          item.totalQuantity = inventory.countItemQuantity(item.id);
          bagItem.item = item;
        }));
      });
      return Promise.all(promises);
    }).then(() => {
      return Promise.resolve();
    });
  }
  deleteByCharacterId(characterId: number) {
    return this._getByCharacterId(characterId).then(inventory => {
      return Promise.all([
        this._money.deleteByInventoryId(inventory.id),
        this._bags.deleteByInventoryId(inventory.id),
        this._bagItems.deleteByInventoryId(inventory.id),
      ]);
    });
  }
  //-- money --
  getMoneyFromSession() {
    return Promise.resolve(this.inventory.money);
  }
  createMoneyFromSession() {
    let money = this._money.create();
    money.inventoryId = this.inventory.id;
    return money;
  }
  //-- bags --
  getBagFromSession(id: number) {
    return Promise.resolve(this.inventory.bags.find(bag => bag.id === id));
  }
  getBagsFromSession() {
    return Promise.resolve(this.inventory.bags);
  }
  createBagFromSession() {
    let bag = this._bags.create();
    this.inventory.addBag(bag);
    return bag;
  }
  moveBagItemQuantity(bagItem: BagItem, bagId: number, quantity: number) {
    return Promise.all([
      this.getBagFromSession(bagItem.bagId),
      this.getBagFromSession(bagId),
    ]).then(([bag, newBag])=>{
      return Promise.all([
        bag.modifyBagItemQuantity(bagItem, quantity, true),
        newBag.addItemQuantity(bagItem.item, quantity),
      ]);
    });
  }
  modifyBagItemQuantity(bagItem: BagItem, quantity: number, isNegative: boolean) {
    return this.getBagFromSession(bagItem.bagId).then(bag => {
      return bag.modifyBagItemQuantity(bagItem, quantity, isNegative);
    });
  }
  //-- bagItems --
  getBagItemFromSession(id: number) {
    return this._bagItems.getById(id);
  }

  //-- override --
  createByCharacterId(characterId: number) {
    let inventory = super.create();
    inventory.characterId = characterId;
    inventory.money = this._money.create();
    inventory.bags = this._bags.createArray();
    let equip = this._bags.create();
    equip.name = "Equip.";
    equip.bagWeight = 0;
    equip.hasLimitedCapacity = false;
    equip.capacity = 0;
    equip.ignoreItemsWeight = false;
    equip.image = this._utility.images.inventory.equipped;
    equip.isProtected = true;
    equip.items = this._bagItems.createArray();
    inventory.bags.push(equip);
    let backpack = this._bags.create();
    //TODO traduzione nome
    backpack.name = "Zaino";
    //TODO peso in base alla versione
    backpack.bagWeight = 2.5;
    backpack.hasLimitedCapacity = false;
    backpack.capacity = 0;
    backpack.ignoreItemsWeight = false;
    backpack.image = this._utility.images.inventory.bag;
    backpack.isProtected = false;
    backpack.items = this._bagItems.createArray();
    inventory.bags.push(backpack);
    return inventory.save(true).then(() => {
      inventory.defaultBagId = inventory.bags[1].id;
      return inventory.save(false);
    });
  }
  load() {
    let promises = [];
    promises.push(this._money.load());
    promises.push(this._bagItems.load());
    promises.push(this._bags.load());
    return Promise.all(promises).then(() => {
      return super.load();
    });
  }
  clear(isDeep: boolean = false) {
    this.inventory = null;

    let promises = [];
    if (isDeep) {
      promises.push(this._money.clear());
      promises.push(this._bagItems.clear());
      promises.push(this._bags.clear());
    }
    return Promise.all(promises).then(() => {
      return super.clear();
    });
  }

  private _getByCharacterId(characterId: number) {
    return this.find(inventory => inventory.characterId === characterId);
  }
}