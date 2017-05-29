import { Component } from '@angular/core';
import { UtilityProvider } from "../../providers/utility/utility";
import { AlertController } from "ionic-angular";

@Component({
  selector: 'total-bar',
  templateUrl: 'total-bar.html'
})
export class TotalBarComponent {

  constructor(
    private _utility: UtilityProvider,
    private _alertCtrl: AlertController,
  ) {
  }

  public get carriedWeight() {
    return this._utility.session.character.carriedWeight;
  }
  public get carriedWeightColor() {
    let result = "secondary";
    if (this._utility.session.character.isEncumbered)
      result = "warning";
    if (this._utility.session.character.isHeavilyEncumbered)
      result = "danger";
    if (this._utility.session.character.isOverMaxCarry)
      result = "alert";
    return result;
  }
  public get carriedWeightIconName() {
    let result = "checkmark-circle";
    if (this._utility.session.character.isEncumbered)
      result = "warning";
    return result;
  }
  public get isEncumbered() {
    return this._utility.session.character.isEncumbered && !this._utility.session.character.isHeavilyEncumbered;
  }
  public get isHeavilyEncumbered() {
    return this._utility.session.character.isHeavilyEncumbered;
  }
  public get isOverMaxCarry() {
    return this._utility.session.character.isOverMaxCarry;
  }

  public showInfo() {
    this._utility.translate(["Ottimo", "Attenzione", "Ok", "NotEncumberedMessage", "EncumberedMessage", "HeavilyEncumberedMessage", "MaxCarryMessage"]).subscribe(values => {
      let message = values["NotEncumberedMessage"];
      let title = values["Ottimo"];
      if (this._utility.session.character.isEncumbered) {
        message = values["EncumberedMessage"];
        title = values["Attenzione"];
      }
      if (this._utility.session.character.isHeavilyEncumbered)
        message = values["HeavilyEncumberedMessage"];
      if (this._utility.session.character.isOverMaxCarry)
        message = values["MaxCarryMessage"];
      this._alertCtrl.create({
        title: title,
        message: message,
        buttons: [
          {
            text: values["Ok"]
          }
        ]
      }).present();
    });
  }

}
