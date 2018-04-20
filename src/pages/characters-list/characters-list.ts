// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { Character } from "../../model/character";
// import { CharactersProvider } from '../../providers/characters/characters';
// import { SessionProvider } from '../../providers/session/session';
// import { OptionsProvider, Theme } from '../../providers/options/options';
// import { UtilityProviderOld } from '../../providers/utility/utility';
// import { InterfaceProvider } from '../../providers/interface/interface';

// @IonicPage()
// @Component({
//   selector: 'page-characters-list',
//   templateUrl: 'characters-list.html',
// })
// export class CharactersListPage {
//   characters: Character[];

//   theme: Theme;
//   headerLogo: string;
//   headerTitle: string;

//   constructor(
//     public navCtrl: NavController,
//     public navParams: NavParams,
//     private _characters: CharactersProvider,
//     private _session: SessionProvider,
//     private _options: OptionsProvider,
//     private _utility: UtilityProviderOld,
//     private _interface: InterfaceProvider,
//   ) {
//     this.theme = this._options.theme;
//     this.headerLogo = this._utility.images.logos.charactersList;
//     this.headerTitle = "SalaEroi";
//   }

//   ionViewDidLoad() {
//     this.characters = this._characters.selectAll();
//     // if (this.characters.length == 1 && !this.navParams.data.skipLoading) {
//     //   this.select(this.characters[0]);
//     // }
//   }

//   add() {
//     this._interface.showModal("CharacterFormPage").then(character => {
//       console.log(character);
//     });
//   }
//   select(character: Character) {
//     this._session.loadCharacter(character);
//     return this.navCtrl.push("HomePage");
//   }
//   showOptions() {
//     return this.navCtrl.push("OptionsPage");
//   }

// }
