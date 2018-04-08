import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Character } from "../../model/character";
import { UtilityProvider } from "../../providers/utility/utility";
import { SessionProvider } from '../../providers/session/session';
import { CharactersListProvider } from '../../providers/characters-list/characters-list';
import { InterfaceProvider } from '../../providers/interface/interface';
import { TranslateProvider } from '../../providers/translate/translate';
import { OptionsProvider, Theme } from '../../providers/options/options';

@IonicPage()
@Component({
  selector: 'page-character-details',
  templateUrl: 'character-details.html',
})
export class CharacterDetailsPage implements OnInit {
  character: Character;
  isEditing: boolean = false;

  name: string;
  race: string;
  class: string;
  strength: number;

  theme: Theme;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _events: Events,
    private _session: SessionProvider,
    private _utility: UtilityProvider,
    private _characters: CharactersListProvider,
    private _interface: InterfaceProvider,
    private _translate: TranslateProvider,
    private _opzioni: OptionsProvider,
  ) {
    this.theme = this._opzioni.theme;
  }

  ngOnInit() {
    this.character = this._session.character;
    this.ngOnChanges();
  }
  ngOnChanges() {
    this.name = this.character.name;
    this.race = this.character.race;
    this.class = this.character.class;
    this.strength = this.character.strength;
  }

  get description() {
    return this.character.description;
  }
  get image() {
    return this._utility.getCharacterImage(this.character);
  }
  get encumberedValue() {
    return this.character.encumberedValue;
  }
  get heavilyEncumberedValue() {
    return this.character.heavilyEncumberedValue;
  }
  get maxCarryValue() {
    return this.character.maxCarryValue;
  }
  get cellStyle() {
    return {
      "border": "1px solid " + this.theme.contrastColor,
    }
  }
  get headerStyle() {
    return {
      "background": `linear-gradient(-90deg, ${this.theme.contrastColor} 8px, transparent 0), linear-gradient(-90deg, ${this.theme.contrastColor} 8px, transparent 0)`,
      "background-position": "left bottom",
      "background-repeat": "repeat-x",
      "background-size": "16px 8px",
    }
  }

  showOptions() {
    return this.navCtrl.push("OptionsPage");
  }
  exit() {
    this._events.publish("character-details:exit");
  }
  modify() {
    this.isEditing = true;
    this.ngOnChanges();
  }
  cancel() {
    this.isEditing = false;
  }
  save() {
    return this._interface.showLoaderLanguage("Salvataggio").then(() => {
      let saveCharacter: Character = Object.assign({}, this.character);
      saveCharacter.name = this.name;
      saveCharacter.race = this.race;
      saveCharacter.class = this.class;
      saveCharacter.strength = this.strength;
      return this._characters.update(saveCharacter);
    }).then(() => {
      this._interface.hideLoader();
      this.isEditing = false;
      return;
    });
  }
  delete() {
    return this._translate.translate(["CancellazionePersonaggio", "CancellarePersonaggio?"]).then(values => {
      let title = values["CancellazionePersonaggio"];
      let message = values["CancellarePersonaggio?"].replace("{0}", this.character.name);
      return this._interface.askConfirmation(title, message)
    }).then(isConfirmed => {
      if (isConfirmed)
        return this._interface.showLoaderLanguage("Salvataggio").then(() => {
          return this._characters.remove(this.character);
        }).then(() => {
          this._interface.hideLoader();
          return;
        })
      else
        return Promise.resolve();
    }).catch(error => {
      this._interface.showError(error);
      console.log(error);
    });
  }

}
