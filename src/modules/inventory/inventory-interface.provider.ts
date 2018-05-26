import { Injectable } from '@angular/core';
import { InterfaceProvider } from '../shared/providers/interface.provider';
import { InventoryProvider } from './inventory.provider';

@Injectable()
export class InventoryInterfaceProvider {
  constructor(
    private _interface: InterfaceProvider,
    private _inventory: InventoryProvider,
  ) { }

  moveBagItemQuantity(id: number, quantity: number) {
    return this._inventory.selectBagsFromSession().then(bags => {
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
      return this._inventory.moveBagItemQuantity(id, Number(bagId), quantity);
    });
  }

  modifyBagItemQuantity(id: number, quantity: number, isNegative: boolean) {
    return this._inventory.selectBagItem(id).then(bagItem => {
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
        return this._inventory.modifyBagItemQuantity(id, quantity, isNegative);
      else
        return Promise.resolve();
    });
  }
}