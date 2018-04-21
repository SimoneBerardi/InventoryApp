import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Loading, ModalOptions, LoadingOptions, AlertOptions } from 'ionic-angular';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { TranslateProvider } from './translate.provider';
import { getNonHydratedSegmentIfLinkAndUrlMatch } from 'ionic-angular/navigation/url-serializer';

@Injectable()
export class InterfaceProvider {

  private _loader: Loading;

  constructor(
    private _modalCtrl: ModalController,
    private _alertCtrl: AlertController,
    private _loadingCtrl: LoadingController,
    private _translate: TranslateProvider,
  ) { }

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
      this._loader.dismiss();
    }
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
    return new Promise((resolve, reject) => {
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
    if (error.message !== "ConfermaUtente") {
      console.log(error);
      return this.showAlert({
        title: "Attenzione",
        message: error.message,
      });
    }
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
  title?: string;
  message?: string;
  cssClass?: string;
  interpolateParams?: any;
}