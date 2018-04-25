import { Injectable } from '@angular/core';
import { StorageProvider } from '../shared/providers/storage.provider';
import { Money } from './model/money.model';
import { BagItem } from './model/bag-item.model';
import { Bag } from './model/bag.model';
import { UtilityProvider } from '../shared/providers/utility.provider';
import { Inventory } from './model/inventory.model';
import { Jsonable } from '../shared/jsonable.model';

@Injectable()
export class InventoryProvider {
  private _moneyKey: string = "inventoryApp_money";
  private _bagItemsKey: string = "inventoryApp_bagItems";
  private _bagsKey: string = "inventoryApp_bags";

  private _money: Money[] = [];
  private _bagItems: BagItem[] = [];
  private _bags: Bag[] = [];

  inventory: Inventory = new Inventory();

  constructor(
    private _storage: StorageProvider,
    private _utility: UtilityProvider,
  ) { }

  insertMoney(characterId: number, money: Money) {
    money.id = this._utility.generateListId(this._money);
    money.characterId = characterId;
    this._money.push(money);
    return this.saveMoney();
  }

  updateMoney(id: number, newMoney: Money) {
    let money = this.selectMoney(id);
    if (!money)
      throw new Error("Monete non trovate");

    newMoney.id = money.id;
    newMoney.characterId = money.characterId;
    Object.assign(money, newMoney);
    this.inventory.money = money;
    return this.saveMoney();
  }

  selectMoney(id: number) {
    return this._money.find(o => o.id === id);
  }

  loadInventory(characterId: number) {
    let money = this._money.find(money => money.characterId === characterId);
    let equipped = this._bagItems.filter(item => item.characterId === characterId && item.bagId === -1);
    let bags = this._bags.filter(bag => bag.characterId === characterId);
    bags.forEach(bag => {
      let items = this._bagItems.filter(item => item.bagId === bag.id);
      bag.items = items;
    });
    this.inventory = new Inventory();
    this.inventory.money = money;
    this.inventory.equipped = equipped;
    this.inventory.bags = bags;
  }

  clear() {
    this._money = [];
    this._bagItems = [];
    this._bags = [];
    this.inventory = new Inventory();

    let promises = [];
    promises.push(this._storage.remove(this._moneyKey));
    promises.push(this._storage.remove(this._bagItemsKey));
    promises.push(this._storage.remove(this._bagsKey));
    return Promise.all(promises);
  }

  load() {
    let promises = [];
    promises.push(this._storage.deserialize<Money>(this._moneyKey, Money));
    promises.push(this._storage.deserialize<BagItem>(this._bagItemsKey, BagItem));
    promises.push(this._storage.deserialize<Bag>(this._bagsKey, Bag));
    return Promise.all(promises).then(([money, bagItems, bags]) => {
      if (money)
        this._money = money as Money[];
      if (bagItems)
        this._bagItems = bagItems as BagItem[];
      if (bags)
        this._bags = bags as Bag[];
      return Promise.resolve();
    });
  }

  saveMoney() {
    return this._storage.serialize(this._moneyKey, this._money);
  }

  loadTestItems() {
    let money = [
      {
        id: 1,
        characterId: 1,
        copper: 50,
        silver: 100,
        electrum: 0,
        gold: 12,
        platinum: 0,
      },
      {
        id: 2,
        characterId: 2,
        copper: 500,
        silver: 10,
        electrum: 12,
        gold: 120,
        platinum: 52,
      }
    ];
    let bags = [
      {
        id: 1,
        characterId: 1,
        name: "Zaino",
        bagWeight: 2.5,
        hasLimitedCapacity: false,
        capacity: 0,
      },
      {
        id: 2,
        characterId: 1,
        name: "Borsa da cintura",
        bagWeight: 1,
        hasLimitedCapacity: false,
        capacity: 0,
      },
      {
        id: 3,
        characterId: 1,
        name: "Zainetto magico",
        bagWeight: 3,
        hasLimitedCapacity: true,
        capacity: 20,
      },
      {
        id: 4,
        characterId: 1,
        name: "Forziere",
        bagWeight: 80,
        hasLimitedCapacity: false,
        capacity: 0,
      },
      {
        id: 5,
        characterId: 2,
        name: "Zaino",
        bagWeight: 2.5,
        hasLimitedCapacity: false,
        capacity: 0,
      }
    ];

    bags.forEach(bag => {
      let max = 5;
      for (let i = 1; i <= max; i++) {
        let item = new BagItem();
        item.id = ((bag.id - 1) * max) + i;
        item.characterId = bag.characterId;
        item.bagId = bag.id;
        item.name = "Oggetto " + i;
        item.description = "Descrizione oggetto " + i;
        item.itemWeight = i;
        item.quantity = max - i;
        this._bagItems.push(item);
      }
    });

    money.forEach(money => {
      let newMoney = new Money();
      Object.assign(newMoney, money);
      this._money.push(newMoney);
    });
    bags.forEach(bag => {
      let newBag = new Bag();
      Object.assign(newBag, bag);
      this._bags.push(newBag);
    });
  }
}