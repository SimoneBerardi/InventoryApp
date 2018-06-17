import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { StorageProvider } from '../shared/providers/storage.provider';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { Inventory } from './model/inventory.model';
import { MoneyProvider } from './money.provider';
import { BagProvider } from './bag.provider';
import { BagItemProvider } from './bag-item.provider';
import { BagItem } from './model/bag-item.model';
import { ItemProvider } from '../items/item.provider';
import { Item } from '../items/item.model';
import { MemoryProvider } from '../shared/memory-provider.model';


@Injectable()
export class InventoryProvider extends MemoryProvider<Inventory>{
  private _inventory: Inventory;

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
        defaultBagId: 7,
      }
    ]
  }

  get carriedWeightClass() {
    let result = "not-encumbered";
    if (this._inventory.carriedWeight > this._utility.session.encumberedValue)
      result = "encumbered";
    if (this._inventory.carriedWeight > this._utility.session.heavilyEncumberedValue)
      result = "heavily-encumbered";
    if (this._inventory.carriedWeight > this._utility.session.maxCarryValue)
      result = "over-max-carry";
    return result;
  }

  loadFromSession() {
    return this._getByCharacterId(this._utility.session.loadedCharacterId).then(inventory => {
      return Promise.all([
        inventory,
        this._money.getByInventoryId(inventory.id),
        this._bags.getByInventoryId(inventory.id),
        this._bagItems.getByInventoryId(inventory.id),
      ]);
    }).then(([inventory, money, bags, bagItems]) => {
      this._inventory = inventory;
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
      this._utility.session.defaultBagId = inventory.defaultBag.id;
      this._utility.session.defaultBagName = inventory.defaultBag.name;
      return Promise.all(promises);
    }).then(() => {
      return Promise.resolve();
    });
  }
  getFromSession() {
    return Promise.resolve(this._inventory);
  }
  deleteFromSession() {
    return this._inventory.delete();
  }
  changeDefaultBagFromSession(bagId: number) {
    this._inventory.defaultBagId = bagId;
    this._utility.session.defaultBagId = this._inventory.defaultBag.id;
    this._utility.session.defaultBagName = this._inventory.defaultBag.name;
    return this._inventory.save(false);
  }
  //-- money --
  getMoneyFromSession() {
    return Promise.resolve(this._inventory.money);
  }
  //-- bags --
  getBagFromSession(bagId: number) {
    return Promise.resolve(this._inventory.bags.find(bag => bag.id === bagId));
  }
  createBagFromSession() {
    let bag = this._bags.create();
    this._inventory.addBag(bag);
    return bag;
  }
  deleteBagFromSession(bagId: number) {
    let bag = this._inventory.getBag(bagId);
    this._inventory.removeBag(bag);
    return bag.delete();
  }
  //-- bagItems --
  getBagItemFromSession(bagItemId: number) {
    return this._bagItems.getById(bagItemId);
  }
  addItemQuantityFromSession(item: Item, bagId: number, quantity: number) {
    return this.getBagFromSession(bagId).then(bag => {
      return bag.addItemQuantity(item, quantity);
    });
  }
  deleteItemFromSession(itemId: number) {
    return this._inventory.removeItem(itemId);
  }
  modifyBagItemQuantityFromSession(bagItem: BagItem, quantity: number, isNegative: boolean) {
    return this.getBagFromSession(bagItem.bagId).then(bag => {
      return bag.modifyBagItemQuantity(bagItem, quantity, isNegative);
    });
  }

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

  //-- override --
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
    this._inventory = null;

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