import { Injectable } from '@angular/core';
import { Inventory } from './model/inventory.model';
import { MoneyProvider } from './money.provider';
import { BagProvider } from './bag.provider';
import { BagItemProvider } from './bag-item.provider';

@Injectable()
export class InventoryProvider {
  inventory: Inventory = new Inventory();

  constructor(
    public money: MoneyProvider,
    public bagItems: BagItemProvider,
    public bags: BagProvider,
  ) { }

  loadInventory(characterId: number) {
    let money = this.money.selectByCharacterId(characterId);
    let items = this.bagItems.selectCharacterId(characterId);
    let equipped = items.filter(item => item.isEquipped);
    let bags = this.bags.selectByCharacterId(characterId);
    bags.forEach(bag => {
      let bagItems = items.filter(item => item.bagId === bag.id);
      bag.items = bagItems;
    });
    this.inventory = new Inventory();
    this.inventory.money = money;
    this.inventory.equipped = equipped;
    this.inventory.bags = bags;
  }

  clear() {
    this.inventory = new Inventory();

    let promises = [];
    promises.push(this.money.clear());
    promises.push(this.bagItems.clear());
    promises.push(this.bags.clear());
    return Promise.all(promises);
  }

  load() {
    let promises = [];
    promises.push(this.money.load());
    promises.push(this.bagItems.load());
    promises.push(this.bags.load());
    return Promise.all(promises);
  }
}