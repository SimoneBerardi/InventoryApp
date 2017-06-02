import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Character } from "../../model/character";
import { UtilityProvider } from "../../providers/utility/utility";

@IonicPage()
@Component({
  selector: 'page-characters-list',
  templateUrl: 'characters-list.html',
})
export class CharactersListPage implements OnInit {
  public characters: Character[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _utility: UtilityProvider,
    private _alertCtrl: AlertController,
  ) {
  }

  ngOnInit() {
    this.characters = this._utility.characters;
    if (this.characters.length == 1) {
      this.select(this.characters[0]);
    }
  }

  public add() {
    this._utility.translate(["NuovoPersonaggio", "Crea", "Annulla", "ComeVuoiChiamarlo?", "NomeGiaUsato", "ScegliAltroNome", "Ok"]).subscribe(values => {
      this._alertCtrl.create({
        title: values["NuovoPersonaggio"],
        message: values["ComeVuoiChiamarlo?"],
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
              if (this._utility.checkDuplicateChar(data.name)) {
                this._alertCtrl.create({
                  title: values["NomeGiaUsato"],
                  message: values["UsaAltroNome"],
                  buttons: [
                    {
                      text: values["Ok"],
                    }
                  ]
                }).present();
              } else {
                let character = this._utility.addCharacter(data.name);
                this.select(character);
              }
            }
          }
        ]
      }).present();
    });
  }
  public select(character: Character) {
    this._utility.selectCharacter(character);
    this.navCtrl.push("HomePage");
  }

}
