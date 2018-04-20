import { Component, Input } from '@angular/core';
import { AlertController } from "ionic-angular";
import { SessionProvider } from '../../providers/session.provider';
import { TranslateProvider } from '../../../../providers/translate/translate';

@Component({
  selector: 'total-bar',
  templateUrl: 'total-bar.html'
})
export class TotalBarComponent {
  constructor(
    private _alertCtrl: AlertController,
    private _session: SessionProvider,
    private _translate: TranslateProvider,
  ) { }

  // get carriedWeight() {
  //   return this._session.character.carriedWeight;
  // }
  // get carriedWeightColor() {
  //   let result = "secondary";
  //   if (this._session.character.isEncumbered)
  //     result = "warning";
  //   if (this._session.character.isHeavilyEncumbered)
  //     result = "danger";
  //   if (this._session.character.isOverMaxCarry)
  //     result = "alert";
  //   return result;
  // }
  // get carriedWeightIconName() {
  //   let result = "checkmark-circle";
  //   if (this._session.character.isEncumbered)
  //     result = "warning";
  //   return result;
  // }
  // get isEncumbered() {
  //   return this._session.character.isEncumbered && !this._session.character.isHeavilyEncumbered;
  // }
  // get isHeavilyEncumbered() {
  //   return this._session.character.isHeavilyEncumbered;
  // }
  // get isOverMaxCarry() {
  //   return this._session.character.isOverMaxCarry;
  // }

  // showInfo() {
  //   this._translate.translate(["Ottimo", "Attenzione", "Ok", "NotEncumberedMessage", "EncumberedMessage", "HeavilyEncumberedMessage", "MaxCarryMessage"]).then(values => {
  //     let message = values["NotEncumberedMessage"];
  //     let title = values["Ottimo"];
  //     if (this._session.character.isEncumbered) {
  //       message = values["EncumberedMessage"];
  //       title = values["Attenzione"];
  //     }
  //     if (this._session.character.isHeavilyEncumbered)
  //       message = values["HeavilyEncumberedMessage"];
  //     if (this._session.character.isOverMaxCarry)
  //       message = values["MaxCarryMessage"];
  //     this._alertCtrl.create({
  //       title: title,
  //       message: message,
  //       buttons: [
  //         {
  //           text: values["Ok"]
  //         }
  //       ]
  //     }).present();
  //   });
  // }

}
