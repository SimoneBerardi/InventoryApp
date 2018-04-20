import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CharacterProvider } from '../../character.provider';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { Character } from '../../character.model';

@IonicPage()
@Component({
  selector: 'page-character-form',
  templateUrl: 'character-form.html',
})
export class CharacterFormPage {
  private _id: number;
  private _form: FormGroup;

  headerLogo: string;
  headerTitle: string;

  image: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _formBuilder: FormBuilder,
    private _characters: CharacterProvider,
    private _utility: UtilityProvider,
    private _events: Events,
  ) {
    this._form = this._formBuilder.group({
      name: ["", Validators.required],
      race: ["", Validators.required],
      className: ["", Validators.required],
      strength: [10, Validators.required],
    });
    this.image = this._utility.images.avatars[0];

    this.headerLogo = this._utility.images.logos.character;
    this.headerTitle = "DettagliPersonaggio";

    this._id = this.navParams.get("id");
  }

  ionViewDidLoad() {
    if (this._id !== undefined) {
      let character = this._characters.select(this._id);
      this._form.reset({
        name: character.name,
        race: character.race,
        className: character.className,
        strength: character.strength,
      });
      this.image = character.image;
    }
  }

  save() {
    let model = this._form.value;
    let character = new Character();
    character.image = this.image;
    Object.assign(character, model);
    Promise.resolve().then(() => {
      if (this._id !== undefined)
        this._characters.update(this._id, character);
      else
        this._characters.insert(character);
    }).then(() => {
      this.viewCtrl.dismiss();
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  delete() {
    this._characters.delete(this._id).then(() => {
this._events.publish("exit");
    });
  }

}
