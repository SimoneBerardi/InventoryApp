import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Character } from "../../model/character";
import { UtilityProvider } from "../../providers/utility/utility";
import { SessionProvider } from '../../providers/session/session';
import { CharactersListProvider } from '../../providers/characters-list/characters-list';
import { InterfaceProvider } from '../../providers/interface/interface';
import { TranslateProvider } from '../../providers/translate/translate';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _events: Events,
    private _session: SessionProvider,
    private _utility: UtilityProvider,
    private _characters: CharactersListProvider,
    private _interface: InterfaceProvider,
    private _translate: TranslateProvider,
  ) {
  }

  ngOnInit() {
    this.character = this._session.character;
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
