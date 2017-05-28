import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { Character } from "../../model/character";
import { UtilityProvider } from "../../providers/utility/utility";
import { JsonObject } from "../../model/json-model";

@IonicPage()
@Component({
  selector: 'page-character-details',
  templateUrl: 'character-details.html',
})
export class CharacterDetailsPage implements OnInit {
  public character: Character = new Character();
  public isEditing: boolean = false;

  private _savedCharacter: Character;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _utility: UtilityProvider,
    private _events: Events,
    private _alertCtrl: AlertController,
  ) {
    if (navParams.data.isEditing)
      this.isEditing = navParams.data.isEditing;
  }

  ngOnInit() {
    this.character = this._utility.session.character;
  }

  public get name() {
    return this.character.name;
  }
  public set name(value: string) {
    this.character.name = value;
  }
  public get image() {
    return this._utility.getImage(this.character);
  }
  public get description() {
    return this.character.description;
  }
  public get strength() {
    return this.character.strength;
  }
  public set strength(value: number) {
    this.character.strength = value;
  }
  public get race() {
    return this.character.race;
  }
  public set race(value: string) {
    this.character.race = value;
  }
  public get class() {
    return this.character.class;
  }
  public set class(value: string) {
    this.character.class = value;
  }
  public get encumberedValue() {
    return this.character.encumberedValue;
  }
  public get heavilyEncumberedValue() {
    return this.character.heavilyEncumberedValue;
  }
  public get maxCarryValue() {
    return this.character.maxCarryValue;
  }

  public exit() {
    this._events.publish("character-details:exit");
  }
  public modify() {
    this._savedCharacter = Object.assign({}, this.character);
    this.isEditing = true;
  }
  public cancelEditing() {
    this.character = JsonObject.parse(Character, this._savedCharacter);
    this.isEditing = false;
  }
  public save() {
    this.isEditing = false;
    this._utility.saveToStorage();
  }
  public delete() {
    this._utility.translate(["CancellazionePersonaggio", "CancellarePersonaggio?", "Si", "No"]).subscribe(values => {
      this._alertCtrl.create({
        title: values["CancellazionePersonaggio"],
        message: values["CancellarePersonaggio?"],
        buttons: [
          {
            text: values["No"]
          },
          {
            text: values["Si"],
            handler: () => {
              this._utility.removeCharacter(this.character);
              this._events.publish("character-details:exit");
            }
          }
        ]
      }).present();
    });
  }

}
