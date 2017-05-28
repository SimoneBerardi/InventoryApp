import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { Bag } from "../../model/bag";
import { UtilityProvider } from "../../providers/utility/utility";

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage implements OnInit {
  public bags: Bag[] = new Array<Bag>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _utility: UtilityProvider,
    private _events: Events,
    private _alertCtrl: AlertController,
  ) {
    this._events.unsubscribe("bag:edit");
    this._events.subscribe("bag:edit", bag => {
      this.navCtrl.push("BagDetailsPage", { bag: bag });
    });
  }

  ngOnInit() {
    this.bags = this._utility.session.character.bags;
  }

  public add() {
    this._utility.translate(["NuovaBorsa", "Crea", "Annulla", "ComeVuoiChiamarla?"]).subscribe(values => {
      this._alertCtrl.create({
        title: values["NuovaBorsa"],
        message: values["ComeVuoiChiamarla?"],
        inputs: [
          {
            name: "name",
          }
        ],
        buttons: [
          {
            text: values["Annulla"],
          },
          {
            text: values["Crea"],
            handler: data => {
              let bag = this._utility.session.character.addBag(data.name);
              this._utility.saveToStorage();
              this.navCtrl.push("BagDetailsPage", { bag: bag });
            }
          }
        ]
      }).present();
    });
  }
}
