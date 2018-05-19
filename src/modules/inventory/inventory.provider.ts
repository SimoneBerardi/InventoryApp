import { Injectable } from '@angular/core';
import { Inventory } from './model/inventory.model';
import { MoneyProvider } from './money.provider';
import { BagProvider } from './bag.provider';
import { BagItemProvider } from './bag-item.provider';
import { Money } from './model/money.model';
import { Bag } from './model/bag.model';
import { BagItem } from './model/bag-item.model';
import { CharacterProvider } from '../characters/character.provider';

@Injectable()
export class InventoryProvider {
  images = {
    logo: "assets/images/inventory/logo.png",
    money: "assets/images/inventory/money.png",
    equipped: "assets/images/inventory/equipped.png",
    bag: "assets/images/inventory/bag.png",
    bagArrow: "assets/images/inventory/bag-arrow.png",
    status:{
      green: "assets/images/inventory/status_green.png",
      orange: "assets/images/inventory/status_orange.png",
      red: "assets/images/inventory/status_red.png",
    }
  };
  inventory: Inventory = new Inventory();

  constructor(
    private _characters: CharacterProvider,
    private _money: MoneyProvider,
    private _bagItems: BagItemProvider,
    private _bags: BagProvider,
  ) {
    this._characters.onSelectCharacter.subscribe(id => {
      this.loadInventory(id)
    });
  }

  moveBagItem(id: number, bagId: number) {
    let bagItem = this._bagItems.select(id);
    if (!bagItem)
      throw new Error("NonTrovato");

    this.inventory.deleteBagItem(bagItem);
    this.inventory.addBagItem(bagItem, bagId);
    return this._bagItems.update(id, bagItem);
  }

  modifyBagItemQuantity(id: number, quantity: number, isNegative: boolean) {
    let bagItem = this._bagItems.select(id);
    if (!bagItem)
      throw new Error("NonTrovato");
    if (isNegative && quantity > bagItem.quantity)
      throw new Error("QuantitàInsufficiente");

    if (isNegative && quantity === bagItem.quantity) {
      return this.deleteBagItem(id);
    } else {
      if (isNegative)
        bagItem.quantity -= quantity;
      else
        bagItem.quantity += quantity;
      return this._bagItems.save();
    }
  }

  deleteBagItem(id: number) {
    let bagItem = this._bagItems.select(id);
    if (!bagItem)
      throw new Error("NonTrovato");

    this.inventory.deleteBagItem(bagItem);
    return this._bagItems.delete(id);
  }

  updateBagItem(id: number, newBagItem: BagItem) {
    let bagItem = this._bagItems.select(id);
    newBagItem.characterId = bagItem.characterId;
    newBagItem.bagId = bagItem.bagId;
    return this._bagItems.update(id, newBagItem);
  }

  //TODO Considerare se leggere gli elementi sempre dalla cache
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

  loadInventory(characterId: number) {
    let money = this._money.selectByCharacterId(characterId);
    let items = this._bagItems.selectCharacterId(characterId);
    let equipped = items.filter(item => item.isEquipped);
    let bags = this._bags.selectByCharacterId(characterId);
    bags.forEach(bag => {
      let bagItems = items.filter(item => item.bagId === bag.id);
      bag.items = bagItems;
    });
    this.inventory = new Inventory();
    this.inventory.characterId = characterId;
    this.inventory.money = money;
    this.inventory.equipped = equipped;
    this.inventory.bags = bags;
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
}