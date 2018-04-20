import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Character } from '../../character.model';
import { SessionProvider } from '../../../shared/providers/session.provider';
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
  headerLogo: string;
  headerTitle: string;

  name: string;
  image: string;
  strength: number;
  description: string;
  encumberedValue: number;
  heavilyEncumberedValue: number;
  maxCarryValue: number;
  dragValue: number;
  liftValue: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _characters: CharacterProvider,
    private _session: SessionProvider,
    private _utility: UtilityProvider,

    private _interface: InterfaceProvider,
    private _options: OptionsProvider,
  ) {
    this.headerLogo = this._utility.images.logos.character;
    this.headerTitle = "SchedaPersonaggio";
  }

  ionViewDidEnter() {
    let character = this._characters.select(this._session.characterId);
    this.name = character.name;
    this.image = character.image;
    this.strength = character.strength;
    this.description = character.description;
    this.encumberedValue = character.encumberedValue;
    this.heavilyEncumberedValue = character.heavilyEncumberedValue;
    this.maxCarryValue = character.maxCarryValue;
    this.dragValue = character.dragValue;
    this.liftValue = character.liftValue;
  }

  get cellStyle() {
    return {
      "border": "1px solid " + this._options.contrastColor,
    }
  }
  get headerStyle() {
    return {
      "background": `linear-gradient(-90deg, ${this._options.contrastColor} 8px, transparent 0), linear-gradient(-90deg, ${this._options.contrastColor} 8px, transparent 0)`,
      "background-position": "left bottom",
      "background-repeat": "repeat-x",
      "background-size": "16px 8px",
    }
  }
  get dragonStyle() {
    return {
      "-webkit-mask-box-image": `url("${this._utility.images.dragon_3_5}")`,
      "background-color": this._options.contrastColor,
    }
  }

  modify() {
    this._interface.showModal("CharacterFormPage", { id: this._session.characterId })
  }

}
