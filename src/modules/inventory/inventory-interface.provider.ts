import { Injectable } from '@angular/core';
import { InterfaceProvider } from '../shared/providers/interface.provider';
import { InventoryProvider } from './inventory.provider';
import { Events } from 'ionic-angular';
import { BagItem } from './model/bag-item.model';
import { ItemInventoryAction } from '../items/item.provider';

@Injectable()
export class InventoryInterfaceProvider {
  constructor(
    private _interface: InterfaceProvider,
    private _inventory: InventoryProvider,
    private _events: Events,
  ) { }

  load() {
    this._events.subscribe("Character:add", id => {
      this._inventory.createByCharacterId(id);
    });
    this._events.subscribe("Character:load", id => {
      this._inventory.loadByCharacterId(id);
    });
    this._events.subscribe("Character:delete", id => {
      this._inventory.deleteByCharacterId(id);
    });
    this._events.subscribe("Item:addInventory", (data: ItemInventoryAction) => {
      this._inventory.inventory.defaultBag.addItemQuantity(data.item, data.quantity);
    });
    this._events.subscribe("Item:removeInventory", (data: ItemInventoryAction) => {
      this._inventory.getFromSession().then(inventory => {
        let bagItem = inventory.defaultBag.items.find(bagItem => bagItem.itemId === data.item.id);
        if (!bagItem) {
          this._interface.showAlert({
            title: "Attenzione",
            message: "Oggetto non presente nella borsa " + inventory.defaultBag.name
          });
          return;
        }
        inventory.defaultBag.modifyBagItemQuantity(bagItem, 1, true);
      });
    })
    this._events.subscribe("Item:delete", id => {
      this._inventory.inventory.deleteItem(id);
    });
    return this._inventory.load();
  }

  moveBagItemQuantity(bagItem: BagItem, quantity: number) {
    return this._inventory.getBagsFromSession().then(bags => {
      return this._interface.askSelection({
        title: "ScegliBorsa",
        message: "ScegliBorsa?",
        inputs: bags.map(bag => {
          return {
            label: bag.name,
            value: bag.id.toString(),
          }
        })
      });
    }).then(bagId => {
      return this._inventory.moveBagItemQuantity(bagItem, Number(bagId), quantity);
    });
  }

  modifyBagItemQuantity(bagItem: BagItem, quantity: number, isNegative: boolean) {
    return Promise.resolve().then(() => {
      if (bagItem.quantity === quantity && isNegative)
        return this._interface.askConfirmation({
          title: "ButtareOggetto",
          message: "ButtareOggetto?",
          interpolateParams: {
            bagItemName: bagItem.item.name,
          }
        });
      else
        return Promise.resolve(true);
    }).then(isConfirmed => {
      if (isConfirmed)
        return this._inventory.modifyBagItemQuantity(bagItem, quantity, isNegative);
      else
        return Promise.resolve();
    });
  }
}