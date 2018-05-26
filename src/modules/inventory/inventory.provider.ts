import { Injectable } from '@angular/core';
import { StorageProvider } from '../shared/providers/storage.provider';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { Inventory } from './model/inventory.model';
import { MoneyProvider } from './money.provider';
import { BagProvider } from './bag.provider';
import { BagItemProvider } from './bag-item.provider';
import { Money } from './model/money.model';
import { Bag } from './model/bag.model';
import { BagItem } from './model/bag-item.model';
import { ItemProvider, ItemAddiction } from '../items/item.provider';
import { DataProvider } from '../shared/data-provider.model';
import { Item } from '../items/item.model';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';
import { Events } from 'ionic-angular';


@Injectable()
export class InventoryProvider extends DataProvider<Inventory>{
  inventory: Inventory = new Inventory();

  constructor(
    _storage: StorageProvider,
    _utility: UtilityProvider,
    private _items: ItemProvider,
    private _money: MoneyProvider,
    private _bagItems: BagItemProvider,
    private _bags: BagProvider,
    private _events: Events,
  ) {
    super(
      _storage,
      _utility,
      "inventoryApp_inventory",
      Inventory,
    );

    this._testItems = [
      {
        id: 1,
        characterId: 1,
      },
      {
        id: 2,
        characterId: 2,
      }
    ]

    this._events.subscribe("character:create", id => {
      this._createInventory(id);
    });
    this._events.subscribe("character:load", id => {
      this.selectFromSession();
    });
    this._events.subscribe("character:delete", id => {
      this._deleteInventory(id);
    });
    this._events.subscribe("item:add", (data: ItemAddiction) => {
      let quantity = data.quantity || 1;
      //TODO Scelta borsa
      this.addItem(data.id, this.inventory.bags[0].id, quantity);
    });
    this._events.subscribe("item:delete", id => {
      this._deleteItem(id);
    });
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

  selectFromSession() {
    return Promise.resolve().then(() => {
      if (this.inventory.characterId !== this._utility.session.loadedCharacterId)
        return this._loadByCharacterId(this._utility.session.loadedCharacterId);
      else
        return Promise.resolve(null);
    }).then(inventory => {
      if (inventory !== null)
        this.inventory = inventory;
      return Promise.resolve(this.inventory);
    });
  }

  //BagItem
  countItemQuantity(inventoryId: number, id: number) {
    return this._bagItems.selectByInventoryIdItemId(inventoryId, id).then(bagItems => {
      return Promise.resolve(bagItems.map(bagItem => bagItem.quantity).reduce((a, b) => a + b, 0));
    })
  }

  addItem(id: number, bagId: number, quantity: number) {
    return Promise.all([
      this._items.select(id),
      this._bags.select(bagId)
    ]).then(([item, bag]) => {
      if (!item)
        throw new Error("OggettoNonTrovato");
      if (!bag)
        throw new Error("BorsaNonTrovata");
      if (quantity <= 0)
        throw new Error("QuantitàNonValida");

      return this._addItem(item, bag, quantity);
    });
  }
  moveBagItem(id: number, bagId: number, quantity: number) {
    return Promise.all([
      this._bagItems.select(id),
      this._bags.select(bagId)
    ]).then(([bagItem, bag]) => {
      if (!bagItem)
        throw new Error("OggettoNonTrovato");
      if (!bag)
        throw new Error("BorsaNonTrovata");

      return Promise.all([
        this.modifyBagItemQuantity(id, quantity, true),
        this._addItem(bagItem.item, bag, quantity)
      ])
    });
  }
  modifyBagItemQuantity(id: number, quantity: number, isNegative: boolean) {
    return this._bagItems.select(id).then(bagItem => {
      return Promise.all([
        bagItem,
        this._bags.select(bagItem.bagId)
      ]);
    }).then(([bagItem, bag]) => {
      if (!bagItem)
        throw new Error("OggettoNonTrovato");
      if (!bag)
        throw new Error("BorsaNonTrovata");
      if (isNegative && quantity > bagItem.quantity)
        throw new Error("QuantitàInsufficiente");

      return this._modifyBagItemQuantity(bagItem, quantity, isNegative, bag);
    });
  }
  updateBagItem(id: number, newBagItem: BagItem) {
    return this._bagItems.update(id, newBagItem);
  }
  selectBagItem(id: number) {
    return this._bagItems.select(id);
  }

  //Bag
  deleteBag(id: number) {
    let bag = this.inventory.bags.find(o => o.id === id);
    this.inventory.bags.splice(this.inventory.bags.indexOf(bag), 1);
    return this._bagItems.deleteByBagId(id).then(() => {
      return this._bags.delete(id);
    });
  }
  insertBag(bag: Bag) {
    bag.inventoryId = this.inventory.id;
    return this._bags.insert(bag).then(() => {
      this.inventory.bags.push(bag);
      return Promise.resolve();
    });
  }
  updateBag(id: number, newBag: Bag) {
    return this._bags.update(id, newBag);
  }
  selectBag(id: number) {
    return this._bags.select(id);
  }

  //Money
  updateMoney(id: number, newMoney: Money) {
    return this._money.update(id, newMoney);
  }
  selectMoney(id: number) {
    return this._money.select(id);
  }

  selectByCharacterId(characterId: number) {
    return Promise.resolve(this.list.find(inventory => inventory.characterId === characterId));
  }

  clear(isDeep: boolean = false) {
    this.inventory = new Inventory();

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

  load() {
    let promises = [];
    promises.push(this._money.load());
    promises.push(this._bagItems.load());
    promises.push(this._bags.load());
    return Promise.all(promises).then(() => {
      return super.load();
    });
  }

  private _loadByCharacterId(characterId: number) {
    return this.selectByCharacterId(this._utility.session.loadedCharacterId).then(inventory => {
      return this._loadInventory(inventory)
    });
  }
  private _loadInventory(inventory: Inventory) {
    return Promise.all([
      this._money.selectByInventoryId(inventory.id),
      this._bags.selectByInventoryId(inventory.id),
      this._bagItems.selectByInventoryId(inventory.id)
    ]).then(([money, bags, bagItems]) => {
      inventory.money = money;
      bags.forEach(bag => {
        bag.items = bagItems.filter(bagItem => bagItem.bagId === bag.id);
      });
      inventory.bags = bags;

      let promises = [];
      bagItems.forEach(bagItem => {
        promises.push(this._items.select(bagItem.itemId).then(item => {
          bagItem.item = item;
        }));
        promises.push(this.countItemQuantity(inventory.id, bagItem.itemId).then(count => {
          bagItem.item.totalQuantity = count;
        }));
      });
      return Promise.all(promises);
    }).then(() => {
      return Promise.resolve(inventory);
    });
  }
  private _addItem(item: Item, bag: Bag, quantity: number) {
    let oldItem = bag.items.find(o => o.itemId === item.id);
    if (oldItem) {
      oldItem.quantity += quantity;
      oldItem.item.totalQuantity += quantity;
      return this._bagItems.save();
    } else {
      let bagItem = new BagItem();
      bagItem.itemId = item.id;
      bagItem.bagId = bag.id;
      bagItem.quantity = quantity;
      bagItem.item = item;
      bagItem.item.totalQuantity += quantity;
      bag.items.push(bagItem);
      return this._bagItems.insert(bagItem);
    }
  }
  private _modifyBagItemQuantity(bagItem: BagItem, quantity: number, isNegative: boolean, bag: Bag) {
    if (isNegative)
      bagItem.item.totalQuantity -= quantity;
    else
      bagItem.item.totalQuantity += quantity;

    if (isNegative && quantity === bagItem.quantity) {
      bag.items.splice(bag.items.indexOf(bagItem), 1);
      return this._bagItems.delete(bagItem.id);
    } else {
      if (isNegative)
        bagItem.quantity -= quantity;
      else
        bagItem.quantity += quantity;
      return this._bagItems.save();
    }
  }
  private _createInventory(characterId: number) {
    let inventory = new Inventory();
    inventory.characterId = characterId;
    return this.insert(inventory).then(() => {
      let money = new Money();
      money.inventoryId = inventory.id;
      let equip = new Bag();
      equip.inventoryId = inventory.id;
      equip.name = "Equip.";
      equip.bagWeight = 0;
      equip.hasLimitedCapacity = false;
      equip.capacity = 0;
      equip.ignoreItemsWeight = false;
      equip.image = this._utility.images.inventory.equipped;
      equip.isProtected = true;
      let backpack = new Bag();
      backpack.inventoryId = inventory.id;
      //TODO traduzione nome
      backpack.name = "Zaino";
      //TODO peso in base alla versione
      backpack.bagWeight = 2.5;
      backpack.hasLimitedCapacity = false;
      backpack.capacity = 0;
      backpack.ignoreItemsWeight = false;
      backpack.image = this._utility.images.inventory.bag;
      backpack.isProtected = false;
      let promises = [];
      promises.push(this._money.insert(money));
      promises.push(this._bags.insert(equip));
      promises.push(this._bags.insert(backpack));
      return Promise.all(promises);
    });
  }
  private _deleteInventory(characterId: number) {
    return this.selectByCharacterId(characterId).then(inventory => {
      return Promise.all([
        this._money.deleteByInventoryId(inventory.id),
        this._bags.deleteByInventoryId(inventory.id),
        this._bagItems.deleteByInventoryId(inventory.id),
        this.delete(inventory.id)
      ]);
    });
  }
  private _deleteItem(itemId: number) {
    let promises = [];
    this.inventory.bags.forEach(bag => {
      bag.items = bag.items.filter(o => o.itemId !== itemId);
    });
    return this._bagItems.deleteByItemId(this.inventory.id, itemId);
  }
}