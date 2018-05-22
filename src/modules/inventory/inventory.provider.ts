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
import { CharacterProvider } from '../characters/character.provider';
import { ItemProvider, ItemSelection } from '../items/item.provider';
import { DataProvider } from '../shared/data-provider.model';
import { Item } from '../items/item.model';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';


@Injectable()
export class InventoryProvider extends DataProvider<Inventory>{
  inventory: Inventory = new Inventory();

  constructor(
    _storage: StorageProvider,
    _utility: UtilityProvider,
    private _characters: CharacterProvider,
    private _items: ItemProvider,
    private _money: MoneyProvider,
    private _bagItems: BagItemProvider,
    private _bags: BagProvider,
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

    this._characters.onCreateCharacter.subscribe(id => {
      this._createInventory(id);
    });
    this._characters.onSelectCharacter.subscribe(id => {
      this._loadInventory(id);
    });
    this._characters.onDeleteCharacter.subscribe(id => {
      this._deleteInventory(id);
    })
    this._items.onSelectItem.subscribe((data: ItemSelection) => {
      let quantity = data.quantity || 1;
      //TODO Scelta borsa
      this.addItem(data.id, this.inventory.bags[0].id, quantity);
    });
    this._items.onDeleteItem.subscribe(id => {
      this._deleteItem(id);
    });
  }

  get carriedWeightClass() {
    let result = "not-encumbered";
    if (this.inventory.carriedWeight > this._characters.selectedCharacter.encumberedValue)
      result = "encumbered";
    if (this.inventory.carriedWeight > this._characters.selectedCharacter.heavilyEncumberedValue)
      result = "heavily-encumbered";
    if (this.inventory.carriedWeight > this._characters.selectedCharacter.maxCarryValue)
      result = "over-max-carry";
    return result;
  }

  //BagItem
  addItem(id: number, bagId: number, quantity: number) {
    let item = this._items.select(id);
    let bag = this._bags.select(bagId);
    if (!item)
      throw new Error("OggettoNonTrovato");
    if (!bag)
      throw new Error("BorsaNonTrovata");
    if (quantity <= 0)
      throw new Error("QuantitàNonValida");

    return this._addItem(item, bag, quantity);
  }
  moveBagItem(id: number, bagId: number, quantity: number) {
    let bagItem = this._bagItems.select(id);
    let bag = this._bags.select(bagId);
    if (!bagItem)
      throw new Error("OggettoNonTrovato");
    if (!bag)
      throw new Error("BorsaNonTrovata");

    return this.modifyBagItemQuantity(id, quantity, true).then(() => {
      return this._addItem(bagItem.item, bag, quantity);
    });
  }
  modifyBagItemQuantity(id: number, quantity: number, isNegative: boolean) {
    let bagItem = this._bagItems.select(id);
    let bag = this._bags.select(bagItem.bagId);
    if (!bagItem)
      throw new Error("OggettoNonTrovato");
    if (!bag)
      throw new Error("BorsaNonTrovata");
    if (isNegative && quantity > bagItem.quantity)
      throw new Error("QuantitàInsufficiente");

    return this._modifyBagItemQuantity(bagItem, quantity, isNegative, bag);
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
    return this.list.find(inventory => inventory.characterId === characterId);
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

  private _addItem(item: Item, bag: Bag, quantity: number) {
    let oldItem = bag.items.find(o => o.itemId === item.id);
    if (oldItem) {
      oldItem.quantity += quantity;
      return this._bagItems.save();
    } else {
      let bagItem = new BagItem();
      bagItem.inventoryId = this.inventory.id;
      bagItem.itemId = item.id;
      bagItem.bagId = bag.id;
      bagItem.quantity = quantity;
      bagItem.item = item;
      bag.items.push(bagItem);
      return this._bagItems.insert(bagItem);
    }
  }
  private _modifyBagItemQuantity(bagItem: BagItem, quantity: number, isNegative: boolean, bag: Bag) {
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
  private _loadInventory(characterId: number) {
    this.inventory = this.selectByCharacterId(characterId);
    let money = this._money.selectByInventoryId(this.inventory.id);
    let items = this._bagItems.selectByInventoryId(this.inventory.id);
    let bags = this._bags.selectByInventoryId(this.inventory.id);
    bags.forEach(bag => {
      let bagItems = items.filter(item => item.bagId === bag.id);
      bagItems.forEach(bagItem => {
        let item = this._items.select(bagItem.itemId);
        bagItem.item = item;
      });
      bag.items = bagItems;
    });
    this.inventory.money = money;
    this.inventory.bags = bags;
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
    let inventory = this.selectByCharacterId(characterId);
    let promises = [];
    promises.push(this._money.deleteByInventoryId(inventory.id));
    promises.push(this._bags.deleteByInventoryId(inventory.id));
    promises.push(this._bagItems.deleteByInventoryId(inventory.id));
    promises.push(this.delete(inventory.id));
    return Promise.all(promises);
  }
  private _deleteItem(itemId: number) {
    let promises = [];
    this.inventory.bags.forEach(bag => {
      bag.items = bag.items.filter(o => o.itemId !== itemId);
    });
    return this._bagItems.deleteByItemId(itemId);
  }
}