import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CharacterProvider } from '../../character.provider';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { Character, CharacterSize } from '../../character.model';
import { InterfaceProvider } from '../../../shared/providers/interface.provider';

@IonicPage()
@Component({
  selector: 'page-character-form',
  templateUrl: 'character-form.html',
})
export class CharacterFormPage {
  private _id: number;
  private _form: FormGroup;
  private _avatarIndex: number = 0;

  headerLogo: string;
  headerTitle: string;

  image: string;
  loadImage: string;

  sizes: any[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _formBuilder: FormBuilder,
    private _characters: CharacterProvider,
    private _utility: UtilityProvider,
    private _interface: InterfaceProvider,
  ) {
    this._form = this._formBuilder.group({
      name: ["", Validators.required],
      race: ["", Validators.required],
      className: ["", Validators.required],
      strength: [10, Validators.required],
      size: [1, Validators.required],
    });
    this.image = this._utility.images.avatars[0];

    this.headerLogo = this._utility.images.logos.character;
    this.headerTitle = "DettagliPersonaggio";

    this._id = this.navParams.get("id");
    this.loadImage = this._utility.images.buttons.addImage;
    this.sizes = this._utility.enumerateEnum(CharacterSize);
  }

  ionViewDidLoad() {
    if (this._id !== undefined) {
      this._characters.select(this._id).then(character => {
        this._form.reset({
          name: character.name,
          race: character.race,
          className: character.className,
          strength: character.strength,
          size: character.size,
        });
        this.image = character.image;
      });
    }
  }

  addImage() {
    console.log("TODO - addImage");
  }

  prevAvatar() {
    this._avatarIndex--;
    if (this._avatarIndex < 0)
      this._avatarIndex = this._utility.images.avatars.length - 1;
    this._loadAvatar();
  }

  nextAvatar() {
    this._avatarIndex++;
    if (this._avatarIndex >= this._utility.images.avatars.length)
      this._avatarIndex = 0;
    this._loadAvatar();
  }

  save() {
    this._interface.showLoader({
      content: "Salvataggio",
    }).then(() => {
      let model = this._form.value;
      let character = new Character();
      character.image = this.image;
      Object.assign(character, model);
      this._utility.castNumberProps(character, ["strength"]);
      if (this._id !== undefined)
        return this._characters.update(this._id, character);
      else
        return this._characters.insert(character);
    }).then(() => {
      return this.viewCtrl.dismiss().then(() => {
        this._interface.hideLoader();
      });
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  delete() {
    this._interface.askConfirmation({
      title: "CancellazionePersonaggio",
      message: "CancellarePersonaggio?",
      interpolateParams: {
        characterName: this._form.value.name,
      }
    }).then(isConfirmed => {
      if (!isConfirmed)
        throw new Error("ConfermaUtente");

      return this._interface.showLoader({
        content: "Salvataggio",
      });
    }).then(() => {
      return this._characters.delete(this._id)
    }).then(() => {
      return this.viewCtrl.dismiss();
    }).catch(error => {
      this._interface.showAndLogError(error);
    });
  }

  private _loadAvatar() {
    this.image = this._utility.images.avatars[this._avatarIndex];
  }

}
