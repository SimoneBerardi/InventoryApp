// import { Component, OnInit } from '@angular/core';
// import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
// import { Character } from "../../model/character";
// import { UtilityProviderOld } from "../../providers/utility/utility";
// import { SessionProvider } from '../../providers/session/session';
// import { CharactersProvider } from '../../providers/characters/characters';
// import { InterfaceProvider } from '../../providers/interface/interface';
// import { TranslateProvider } from '../../providers/translate/translate';
// import { OptionsProvider, Theme } from '../../providers/options/options';

// @IonicPage()
// @Component({
//   selector: 'page-character-details',
//   templateUrl: 'character-details.html',
// })
// export class CharacterDetailsPage implements OnInit {
//   private _character: Character;
//   isEditing: boolean = false;

//   name: string;
//   race: string;
//   class: string;
//   strength: number;

//   theme: Theme;
//   headerLogo: string;
//   headerTitle: string;

//   constructor(
//     public navCtrl: NavController,
//     public navParams: NavParams,
//     private _events: Events,
//     private _session: SessionProvider,
//     private _utility: UtilityProviderOld,
//     private _characters: CharactersProvider,
//     private _interface: InterfaceProvider,
//     private _translate: TranslateProvider,
//     private _options: OptionsProvider,
//   ) {
//     this.theme = this._options.theme;
//     this.headerLogo = this._utility.images.logos.character;
//     this.headerTitle = "SchedaPersonaggio";
//   }

//   ngOnInit() {
//     this._character = this._session.character;
//     this.ngOnChanges();
//   }
//   ngOnChanges() {
//     this.name = this._character.name;
//     this.race = this._character.race;
//     this.class = this._character.class;
//     this.strength = this._character.strength;
//   }

//   get description() {
//     return this._character.description;
//   }
//   get image() {
//     return this._utility.getCharacterImage(this._character);
//   }
//   get encumberedValue() {
//     return this._character.encumberedValue;
//   }
//   get heavilyEncumberedValue() {
//     return this._character.heavilyEncumberedValue;
//   }
//   get maxCarryValue() {
//     return this._character.maxCarryValue;
//   }
//   get cellStyle() {
//     return {
//       "border": "1px solid " + this.theme.contrastColor,
//     }
//   }
//   get headerStyle() {
//     return {
//       "background": `linear-gradient(-90deg, ${this.theme.contrastColor} 8px, transparent 0), linear-gradient(-90deg, ${this.theme.contrastColor} 8px, transparent 0)`,
//       "background-position": "left bottom",
//       "background-repeat": "repeat-x",
//       "background-size": "16px 8px",
//     }
//   }
//   get dragonStyle() {
//     return {
//       "-webkit-mask-box-image": `url("${this._utility.images.dragon_3_5}")`,
//       "background-color": this.theme.contrastColor,
//     }
//   }

// }
