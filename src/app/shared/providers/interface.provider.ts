import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Loading, ModalOptions, LoadingOptions, AlertOptions } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { TranslateProvider } from './translate.provider';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { ActionSheetOptions, ActionSheetButton } from 'ionic-angular/components/action-sheet/action-sheet-options';

@Injectable()
export class InterfaceProvider {

  private _loader: Loading;

  constructor(
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private _translate: TranslateProvider,
    private _actionSheetCtrl: ActionSheetController,
  ) { }

  askSelection(opts: SelectionOptions) {
    return new Promise((resolve, reject) => {
      let inputsLabels = opts.inputs.map(input => input.label);
      return this._translate.translate([...inputsLabels, opts.title, opts.message, "Ok", "Annulla"], opts.interpolateParams).then(values => {
        opts.title = values[opts.title];
        opts.message = values[opts.message];
        opts.inputs.forEach(input => {
          input.label = values[input.label];
        });
        let alertOptions = opts as AlertOptions;
        alertOptions.inputs.forEach(input => {
          input.type = "radio";
        });
        alertOptions.enableBackdropDismiss = false;
        alertOptions.buttons = [
          {
            text: values["Annulla"],
            handler: () => {
              reject(new Error("ConfermaUtente"));
            }
          },
          {
            text: values["Ok"],
            handler: data => {
              resolve(data);
            }
          }
        ]
        this._alertCtrl.create(opts).present();
      });
    });
  }

  showActionSheet(opts: ActionSheetOptions) {
    return new Promise((resolve, reject) => {
      let buttonsTexts = opts.buttons.map((button: ActionSheetButton) => button.text);
      return this._translate.translate([...buttonsTexts, opts.title]).then(values => {
        opts.title = values[opts.title];
        opts.buttons.forEach((button: ActionSheetButton) => {
          button.text = values[button.text];
        });
        let actionSheet = this._actionSheetCtrl.create(opts);
        actionSheet.onDidDismiss((data, role) => {
          resolve();
        });
        actionSheet.present();
      });
    });
  }
  /**
   * Mostra una finestra modale raccogliendo l'evento di uscita
   * @param component 
   * @param data 
   * @param opts 
   */
  showModal(component: any, data?: any, opts?: ModalOptions) {
    return new Promise((resolve, reject) => {
      let modal = this._modalCtrl.create(component, data, opts);
      modal.onDidDismiss((data, role) => {
        resolve(data);
      });
      modal.present();
    });
  }
  /**
   * Mostra un caricamento con messaggio in lingua
   * @param opts 
   */
  showLoader(opts: LoadingOptions) {
    return this._translate.translate(opts.content).then(value => {
      opts.content = value;
      if (this._loader != null) {
        this._loader.setContent(opts.content);
        return Promise.resolve();
      }
      else {
        this._loader = this._loadingCtrl.create(opts);
        this._loader.onDidDismiss(() => {
          this._loader = null;
        })
        return this._loader.present();
      }
    });
  }
  /**
   * Nasconde un caricamento
   */
  hideLoader() {
    if (this._loader != null) {
      return this._loader.dismiss();
    } else
      return Promise.resolve();
  }
  /**
   * Richiede una conferma all'utente
   * @param opts 
   */
  askConfirmation(opts: ConfirmationOptions) {
    return new Promise<boolean>((resolve, reject) => {
      this._translate.translate([opts.title, opts.message, "Si", "No"], opts.interpolateParams).then(values => {
        this._alertCtrl.create({
          title: values[opts.title],
          message: values[opts.message],
          cssClass: opts.cssClass,
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
  showAlert(opts: AlertOptions) {
    return new Promise<void>((resolve, reject) => {
      this._translate.translate([opts.title, opts.message, "Ok"]).then(values => {
        opts.title = values[opts.title];
        opts.message = values[opts.message];
        opts.buttons = [{
          text: values["Ok"],
          handler: () => {
            resolve();
          }
        }];
        this._alertCtrl.create(opts).present();
      });
    })
  }
  showAndLogError(error: Error) {
    return this.hideLoader().then(() => {
      if (error.message === "ConfermaUtente")
        throw error;
      return this.showAlert({
        title: "Attenzione",
        message: error.message,
      });
    }).catch(error => {
      //Errore da mascherare
    });
  }
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
   * Mostra un caricamento in lingua
   * @param messageKey 
   */
  showLoaderLanguageOld(messageKey: string) {
    return this._translate.translate(messageKey).then(value => {
      return this._showLoaderOld(value);
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
  /**
   * Chiede una quantità
   * @param max 
   */
  askQuantity(max?: number) {
    return new Promise<number>((resolve, reject) => {
      if (max === 1)
        resolve(max);
      else
        this._translate.translate(["SelezionaQuantita", "Quanti?", "Ok", "Annulla"]).then(values => {
          this._alertCtrl.create({
            title: values["SelezionaQuantita"],
            message: values["Quanti?"],
            enableBackdropDismiss: false,
            inputs: [
              {
                type: "number",
                name: "quantity",
                min: 1,
                max: max,
                value: "1",
              }
            ],
            buttons: [
              {
                text: values["Annulla"],
                handler: () => {
                  reject(new Error("ConfermaUtente"));
                }
              },
              {
                text: values["Ok"],
                handler: data => {
                  if (!data.quantity || data.quantity === "" || isNaN(Number(data.quantity))) {
                    this.showAlert({
                      title: "Attenzione",
                      message: "InserireQuantitaValida"
                    });
                    return false;
                  }

                  let quantity = Number(data.quantity);
                  if (max)
                    quantity = Math.min(max, quantity);
                  resolve(quantity);
                }
              }
            ]
          }).present();
        })
    });
  }
  askConfirmationOld(title: string, message: string) {
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
  private _showLoaderOld(message: string) {
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

export interface ConfirmationOptions {
  title: string;
  message?: string;
  cssClass?: string;
  interpolateParams?: any;
}

export interface SelectionOptions {
  title: string;
  message?: string;
  cssClass?: string;
  inputs: SelectOptionsInput[];
  interpolateParams?: any;
}

export interface SelectOptionsInput {
  label: string;
  value: string;
}