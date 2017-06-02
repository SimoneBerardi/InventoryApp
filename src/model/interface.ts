import { AlertController } from "ionic-angular";
import { UtilityProvider } from "../providers/utility/utility";
import { Bag } from "./bag";

export class CustomComponent {
    constructor(
        protected _utility: UtilityProvider,
        protected _alertCtrl: AlertController,
    ) { }

    public showAlertLanguage(titleKey: string, messageKey: string) {
        this._utility.translate([titleKey, messageKey]).subscribe(values => {
            this.showAlert(values[titleKey], values[messageKey]);
        })
    }
    public showAlert(title: string, message: string) {
        this._utility.translate("Ok").subscribe(value => {
            this._alertCtrl.create({
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

    protected _selectQuantity(max?: number) {
        return new Promise<number>((resolve, reject) => {
            if (max && max == 1)
                resolve(max);
            else {
                this._utility.translate(["SelezionaQuantita", "Quanti?", "Ok", "Annulla", "Tutti"]).subscribe(values => {
                    let alert = this._alertCtrl.create({
                        title: values["SelezionaQuantita"],
                        message: values["Quanti?"],
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
                                        resolve(parseFloat(data.quantity));
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
    protected _selectBag() {
        return new Promise<Bag>((resolve, reject) => {
            if (this._utility.session.character.bags.length == 2)
                resolve(this._utility.session.character.backpack);
            else {
                this._utility.translate(["ScegliZaino", "QualeZaino?", "Conferma", "Annulla"]).subscribe(values => {
                    let alert = this._alertCtrl.create({
                        title: values["ScegliZaino"],
                        message: values["QualeZaino?"],
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
                                    let bag = this._utility.session.character.bags.filter(bag => bag.id == data)[0];
                                    resolve(bag);
                                }
                            }
                        ]
                    });
                    this._utility.session.character.bags.forEach(bag => {
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
}