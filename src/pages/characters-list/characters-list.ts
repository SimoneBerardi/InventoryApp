import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
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
    private _events: Events,
  ) {
    this._events.unsubscribe("character:select");
    this._events.subscribe("character:select", (character: Character) => {
      this.select(character);
    });
  }

  ngOnInit() {
    this.characters = this._utility.characters;
  }

  public add() {
    this._utility.translate(["NuovoPersonaggio", "Crea", "Annulla", "ComeVuoiChiamarlo?"]).subscribe(values => {
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
              this._utility.addCharacter(data.name);
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
