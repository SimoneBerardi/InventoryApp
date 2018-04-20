// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
// import { OptionsProvider, Theme } from '../../providers/options/options';

// @IonicPage()
// @Component({
//   selector: 'page-home',
//   templateUrl: 'home.html',
// })
// export class HomePage {
//   charsListTab = "CharactersListPage";
//   charTab = "CharacterDetailsPage";
//   inventoryTab = "InventoryPage";
//   itemsTab = "ItemsPage";
//   root = "CharactersListPage";

//   theme: Theme;
//   charsListParams = {
//     skipLoading: true,
//   }

//   constructor(
//     public navCtrl: NavController,
//     public navParams: NavParams,
//     private _events: Events,
//     private _options: OptionsProvider,
//   ) {
//     this._events.unsubscribe("options:open");
//     this._events.subscribe("options:open", () => {
//       this.navCtrl.push("OptionsPage");
//     })
//     this._events.unsubscribe("character-details:exit");
//     this._events.subscribe("character-details:exit", () => {
//       this.navCtrl.popToRoot();
//     });

//     this.theme = this._options.theme;
//   }

// }
