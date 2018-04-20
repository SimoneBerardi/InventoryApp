// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CharactersListPage } from '../characters-list/characters-list';
// import { CharactersProvider } from '../../providers/characters/characters';
// import { OptionsProvider, Theme } from '../../providers/options/options';
// import { ViewController } from 'ionic-angular/navigation/view-controller';
// import { Character } from '../../model/character';
// import { UtilityProviderOld } from '../../providers/utility/utility';

// @IonicPage()
// @Component({
//   selector: 'page-character-form',
//   templateUrl: 'character-form.html',
// })
// export class CharacterFormPage {
//   private _id: number;
//   private _form: FormGroup;

//   theme: Theme;
//   headerLogo: string;
//   headerTitle: string;

//   constructor(
//     public navCtrl: NavController,
//     public navParams: NavParams,
//     public viewCtrl: ViewController,
//     private _formBuilder: FormBuilder,
//     private _characters: CharactersProvider,
//     private _options: OptionsProvider,
//     private _utility: UtilityProviderOld,
//   ) {
//     this._form = this._formBuilder.group({
//       name: ["", Validators.required],
//       race: ["", Validators.required],
//       class: ["", Validators.required],
//       strength: [10, Validators.required],
//     });

//     this.theme = this._options.theme;
//     this._id = this.navParams.get("id");
//     this.headerLogo = this._utility.images.logos.character;
//     this.headerTitle = "DettagliPersonaggio";
//   }

//   ionViewDidLoad() {
//     if (this._id !== undefined) {
//       let character = this._characters.select(this._id);
//       this._form.reset({
//         name: [character.name, Validators.required],
//         race: [character.race, Validators.required],
//         class: [character.class, Validators.required],
//         strength: [character.strength, Validators.required],
//       });
//     }
//   }

//   save() {
//     let model = this._form.value;
//     let character = new Character(model.name, model.race, model.class);
//     this._characters.insert(character);
//     this.viewCtrl.dismiss({ action: "save" });
//   }

//   cancel() {
//     this.viewCtrl.dismiss({ action: "cancel" });
//   }

//   delete() {
//     this._characters.delete(this._id);
//     this.viewCtrl.dismiss({ action: "delete" });
//   }

// }
