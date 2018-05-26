import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Character } from '../../character.model';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { CharacterProvider } from '../../character.provider';
import { InterfaceProvider } from '../../../shared/providers/interface.provider';
import { OptionsProvider } from '../../../shared/providers/options.provider';

@IonicPage()
@Component({
  selector: 'page-character-info',
  templateUrl: 'character-info.html',
})
export class CharacterInfoPage {
  private _character: Character;

  headerLogo: string;
  headerTitle: string;

  isLoading: boolean = true;
  dragonImage: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _characters: CharacterProvider,
    private _utility: UtilityProvider,
    private _events: Events,
    private _interface: InterfaceProvider,
    private _options: OptionsProvider,
  ) {
    this.headerLogo = this._utility.images.logos.character;
    this.headerTitle = "SchedaPersonaggio";
    this.dragonImage = this._utility.images.dragon_3_5;
  }

  get name() {
    return this._character.name;
  }
  get image() {
    return this._character.image;
  }
  get strength() {
    return this._character.strength;
  }
  get description() {
    return this._character.description;
  }
  get encumberedValue() {
    return this._character.encumberance.encumbered;
  }
  get heavilyEncumberedValue() {
    return this._character.encumberance.heavilyEncumbered;
  }
  get maxCarryValue() {
    return this._character.encumberance.maxCarry;
  }
  get dragValue() {
    return this._character.encumberance.drag;
  }
  get liftValue() {
    return this._character.encumberance.lift;
  }

  ionViewWillEnter() {
    this._characters.selectFromSession().then(character => {
      this._character = character;
      this.isLoading = false;
    });
  }

  modify() {
    this._interface.showModal("CharacterFormPage", { id: this._character.id });
  }
}
