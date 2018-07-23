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
      this._inventory.createByCharacterId(id).catch(error => {
        this._interface.showAndLogError(error);
      });
    });
    this._events.subscribe("Character:load", id => {
      this._inventory.loadFromSession().catch(error => {
        this._interface.showAndLogError(error);
      });
    });
    this._events.subscribe("Character:delete", id => {
      this._inventory.deleteFromSession().catch(error => {
        this._interface.showAndLogError(error);
      });
    });
    this._events.subscribe("Item:addInventory", (data: ItemInventoryAction) => {
      this._inventory.getFromSession().then(inventory => {
        return this._inventory.addItemQuantityFromSession(data.item, inventory.defaultBagId, data.quantity);
      }).catch(error => {
        this._interface.showAndLogError(error);
      });
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
        this._inventory.modifyBagItemQuantityFromSession(bagItem, data.quantity);
      }).catch(error => {
        this._interface.showAndLogError(error);
      });
    })
    this._events.subscribe("Item:delete", id => {
      this._inventory.deleteItemFromSession(id).catch(error => {
        this._interface.showAndLogError(error);
      });
    });
    this._events.subscribe("Item:changeBag", () => {
      this._inventory.getFromSession().then(inventory => {
        return this._selectBag(inventory.defaultBagId);
      }).then(bagId => {
        return this._inventory.changeDefaultBagFromSession(bagId);
      }).catch(error => {
        this._interface.showAndLogError(error);
      });
    })
    return this._inventory.load();
  }

  moveBagItemQuantity(bagItem: BagItem) {
    return this._interface.askQuantity(bagItem.quantity, 1, bagItem.quantity).then(quantity => {
      return Promise.all([
        quantity,
        this._selectBag(bagItem.bagId),
      ]);
    }).then(([quantity, bagId]) => {
      return Promise.all([
        this._inventory.modifyBagItemQuantityFromSession(bagItem, -quantity),
        this._inventory.addItemQuantityFromSession(bagItem.item, bagId, quantity),
      ]);
    });
  }

  modifyBagItemQuantity(bagItem: BagItem, quantity: number) {
    return Promise.resolve().then(() => {
      if (bagItem.quantity + quantity <= 0)
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
        return this._inventory.modifyBagItemQuantityFromSession(bagItem, quantity);
      else
        return Promise.resolve();
    });
  }

  private _selectBag(bagId: number): Promise<number> {
    return this._inventory.getFromSession().then(inventory => {
      let bags = inventory.bags.filter(bag => bag.id !== bagId);
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
      return Promise.resolve(Number(bagId));
    });
  }
}