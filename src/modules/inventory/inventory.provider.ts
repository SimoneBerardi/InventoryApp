import { Injectable } from '@angular/core';
import { Inventory } from './model/inventory.model';
import { MoneyProvider } from './money.provider';
import { BagProvider } from './bag.provider';
import { BagItemProvider } from './bag-item.provider';
import { Money } from './model/money.model';
import { Bag } from './model/bag.model';
import { BagItem } from './model/bag-item.model';
import { CharacterProvider } from '../characters/character.provider';
import { ItemProvider, ItemSelection } from '../items/item.provider';

@Injectable()
export class InventoryProvider {
  inventory: Inventory = new Inventory();

  constructor(
    private _characters: CharacterProvider,
    private _items: ItemProvider,
    private _money: MoneyProvider,
    private _bagItems: BagItemProvider,
    private _bags: BagProvider,
  ) {
    this._characters.onSelectCharacter.subscribe(id => {
      this._loadInventory(id);
    });
    this._items.onSelectItem.subscribe((data: ItemSelection) => {
      let quantity = data.quantity || 1;
      //TODO Scelta borsa
      this.addItem(data.id, 1, quantity);
    });
  }

  addItem(id: number, bagId: number, quantity: number) {
    let item = this._items.select(id);
    let bag = this._bags.select(bagId);
    if (!item)
      throw new Error("OggettoNonTrovato");
    if (!bag)
      throw new Error("BorsaNonTrovata");
    if (quantity <= 0)
      throw new Error("QuantitàNonValida");

    let bagItem = new BagItem();
    bagItem.characterId = this.inventory.characterId;
    bagItem.itemId = id;
    bagItem.bagId = bagId;
    bagItem.name = item.name;
    bagItem.description = item.description;
    bagItem.itemWeight = item.weight;
    bagItem.quantity = quantity;

    return this._addBagItem(bagItem, bag);
  }

  moveBagItem(id: number, bagId: number, quantity: number) {
    let bagItem = this._bagItems.select(id);
    let bag = this._bags.select(bagId);
    if (!bagItem)
      throw new Error("OggettoNonTrovato");
    if (!bag)
      throw new Error("BorsaNonTrovata");

    return this.modifyBagItemQuantity(id, quantity, true).then(() => {
      let newBagItem = new BagItem();
      Object.assign(newBagItem, bagItem);
      newBagItem.quantity = quantity;
      this._addBagItem(bagItem, bag);
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
    let bagItem = this._bagItems.select(id);
    newBagItem.characterId = bagItem.characterId;
    newBagItem.bagId = bagItem.bagId;
    return this._bagItems.update(id, newBagItem);
  }

  selectBagItem(id: number) {
    return this._bagItems.select(id);
  }

  deleteBag(id: number) {
    return this._bagItems.deleteByBagId(id).then(() => {
      return this._bags.delete(id);
    });
  }

  updateBag(id: number, newBag: Bag) {
    let bag = this._bags.select(id);
    newBag.characterId = this.inventory.characterId;
    return this._bags.update(id, newBag);
  }

  insertBag(bag: Bag) {
    bag.characterId = this.inventory.characterId;
    return this._bags.insert(bag).then(() => {
      this.inventory.bags = this._bags.selectByCharacterId(this.inventory.characterId);
      return Promise.resolve();
    })
  }

  selectBag(id: number) {
    return this._bags.select(id);
  }

  updateMoney(id: number, newMoney: Money) {
    let money = this._money.select(id);
    newMoney.characterId = this.inventory.characterId;
    return this._money.update(id, newMoney);
  }

  selectMoney(id: number) {
    return this._money.select(id);
  }

  clear() {
    this.inventory = new Inventory();

    let promises = [];
    promises.push(this._money.clear());
    promises.push(this._bagItems.clear());
    promises.push(this._bags.clear());
    return Promise.all(promises);
  }

  load() {
    let promises = [];
    promises.push(this._money.load());
    promises.push(this._bagItems.load());
    promises.push(this._bags.load());
    return Promise.all(promises);
  }

  private _addBagItem(bagItem: BagItem, bag: Bag) {
    let duplicateBagItem = bag.addBagItem(bagItem);
    if (duplicateBagItem === null)
      return this._bagItems.insert(bagItem);
    else
      return this._bagItems.save();
  }
  private _modifyBagItemQuantity(bagItem: BagItem, quantity: number, isNegative: boolean, bag: Bag) {
    let isDeleted = bag.modifyBagItemQuantity(bagItem, quantity, isNegative);
    if (isDeleted)
      return this._bagItems.delete(bagItem.id);
    else
      return this._bagItems.save();
  }
  private _loadInventory(characterId: number) {
    let money = this._money.selectByCharacterId(characterId);
    let items = this._bagItems.selectCharacterId(characterId);
    let bags = this._bags.selectByCharacterId(characterId);
    bags.forEach(bag => {
      let bagItems = items.filter(item => item.bagId === bag.id);
      bag.items = bagItems;
    });
    this.inventory = new Inventory();
    this.inventory.characterId = characterId;
    this.inventory.money = money;
    this.inventory.bags = bags;
  }
}