import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Character } from "../../model/character";
import { CharactersListProvider } from '../../providers/characters-list/characters-list';
import { SessionProvider } from '../../providers/session/session';
import { TranslateProvider } from '../../providers/translate/translate';

@IonicPage()
@Component({
  selector: 'page-characters-list',
  templateUrl: 'characters-list.html',
})
export class CharactersListPage implements OnInit {
  characters: Character[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _alertCtrl: AlertController,
    private _characters: CharactersListProvider,
    private _session: SessionProvider,
    private _translate: TranslateProvider,
  ) {
  }

  ngOnInit() {
    this.characters = this._characters.characters;
    if (this.characters.length == 1) {
      this.select(this.characters[0]);
    }
  }

  add() {
    return this._translate.translate(["NuovoPersonaggio", "Crea", "Annulla", "ScegliUnNome", "NomeGiaUsato", "ScegliAltroNome", "Ok"]).then(values => {
      this._alertCtrl.create({
        title: values["NuovoPersonaggio"],
        message: values["ScegliUnNome"],
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
              if (this._characters.nameAlreadyExists(data.name)) {
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
                this._characters.add(data.name).then(character => {
                  return this.select(character);
                });
              }
            }
          }
        ]
      }).present();
    });
  }
  select(character: Character) {
    this._session.loadCharacter(character);
    return this.navCtrl.push("HomePage");
  }
  showOptions() {
    return this.navCtrl.push("OptionsPage");
  }

}
