import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Bag } from "../../model/bag";
import { SessionProvider } from '../../providers/session/session';
import { TranslateProvider } from '../../providers/translate/translate';
import { OptionsProvider, Theme } from '../../providers/options/options';
import { UtilityProviderOld } from '../../providers/utility/utility';

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage implements OnInit {
  bags: Bag[] = new Array<Bag>();

  theme: Theme;
  headerLogo: string;
  headerTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _session: SessionProvider,
    private _translate: TranslateProvider,
    private _options: OptionsProvider,
    private _utility: UtilityProviderOld
  ) {
    this.theme = this._options.theme;
    this.headerLogo = this._utility.images.logos.inventory;
    this.headerTitle = "Inventario";
  }

  ngOnInit() {
    this.bags = this._session.character.bags;
  }

  add() {
    this._translate.translate(["NuovaBorsa", "Crea", "Annulla", "ComeVuoiChiamarla?"]).then(values => {
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
              let bag = this._session.character.addBag(data.name);
              this._session.saveCharacter();
              this.navCtrl.push("BagDetailsPage", { bag: bag });
            }
          }
        ]
      }).present();
    });
  }
  edit(bag: Bag) {
    this.navCtrl.push("BagDetailsPage", { bag: bag });
  }
}
