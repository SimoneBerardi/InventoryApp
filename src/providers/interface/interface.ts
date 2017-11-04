import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Loading } from 'ionic-angular';
import { Character } from '../../model/character';
import { Bag } from '../../model/bag';
import { TranslateProvider } from '../translate/translate';

@Injectable()
export class InterfaceProvider {

  private _loader: Loading;

  constructor(
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private _translate: TranslateProvider,
  ) { }

  /**
   * Mostra un messaggio di errore
   * @param message 
   */
  showError(message: string) {
    return this._translate.translate("Attenzione").then(value => {
      return this._showAlert(value, message);
    });
  }
  /**
   * Nasconde un caricamento
   */
  hideLoader() {
    if (this._loader != null) {
      this._loader.dismiss();
      this._loader = null;
    }
  }
  /**
   * Mostra un caricamento in lingua
   * @param messageKey 
   */
  showLoaderLanguage(messageKey: string) {
    return this._translate.translate(messageKey).then(value => {
      return this._showLoader(value);
    });
  }
  /**
   * Mostra un messaggio in lingua
   * @param titleKey 
   * @param messageKey 
   */
  showAlertLanguage(titleKey: string, messageKey: string) {
    this._translate.translate([titleKey, messageKey]).then(values => {
      this._showAlert(values[titleKey], values[messageKey]);
    })
  }

  selectQuantity(max?: number) {
    return new Promise<number>((resolve, reject) => {
      if (max && max == 1)
        resolve(max);
      else {
        this._translate.translate(["SelezionaQuantita", "Quanti?", "Ok", "Annulla", "Tutti"]).then(values => {
          let alert = this._alertCtrl.create({
            title: values["SelezionaQuantita"],
            message: values["Quanti?"],
            enableBackdropDismiss: false,
            inputs: [
              {
                type: "number",
                name: "quantity",
                min: 1,
              }
            ],
            buttons: [
              {
                text: values["Annulla"],
                handler: () => {
                  console.log("Selezione quantità annullata dall'utente");
                  reject();
                }
              },
              {
                text: values["Ok"],
                handler: data => {
                  if (data.quantity && data.quantity != "" && parseFloat(data.quantity) > 0) {
                    let quantity = parseFloat(data.quantity);
                    if (max)
                      quantity = Math.min(max, quantity);
                    resolve(quantity);
                  } else {
                    this.showAlertLanguage("Attenzione", "InserireQuantitaValida");
                    return false;
                  }
                }
              }
            ]
          });
          alert.present();
        })
      }
    });
  }
  selectBag(character: Character) {
    return new Promise<Bag>((resolve, reject) => {
      if (character.bags.length == 2)
        resolve(character.backpack);
      else {
        this._translate.translate(["ScegliZaino", "InQualeZaino?", "Conferma", "Annulla"]).then(values => {
          let alert = this._alertCtrl.create({
            title: values["ScegliZaino"],
            message: values["InQualeZaino?"],
            enableBackdropDismiss: false,
            buttons: [
              {
                text: values["Annulla"],
                handler: () => {
                  console.log("Selezione borsa annullata dall'utente");
                  reject();
                }
              },
              {
                text: values["Conferma"],
                handler: data => {
                  let bag = character.bags.filter(bag => bag.id == data)[0];
                  resolve(bag);
                }
              }
            ]
          });
          character.bags.forEach(bag => {
            alert.addInput({
              type: "radio",
              label: bag.name,
              value: bag.id.toString()
            })
          });
          alert.present();
        });
      }
    });
  }
  askConfirmation(title: string, message: string) {
    return new Promise<boolean>((resolve, reject) => {
      this._translate.translate(["Si", "No"]).then(values => {
        this._alertCtrl.create({
          title: title,
          message: message,
          enableBackdropDismiss: false,
          buttons: [
            {
              text: values["No"],
              handler: () => {
                resolve(false);
              }
            },
            {
              text: values["Si"],
              handler: () => {
                resolve(true);
              }
            }
          ]
        }).present();
      });
    });
  }

  private _showAlert(title: string, message: string) {
    return this._translate.translate("Ok").then(value => {
      return this._alertCtrl.create({
        title: title,
        message: message,
        buttons: [
          {
            text: value
          }
        ]
      }).present();
    });
  }
  private _showLoader(message: string) {
    if (this._loader != null)
      this._loader.setContent(message);
    else {
      this._loader = this._loadingCtrl.create({
        content: message,
        dismissOnPageChange: true,
      });
      this._loader.present();
    }
  }
}
