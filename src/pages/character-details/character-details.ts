import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Character } from "../../model/character";
import { UtilityProvider } from "../../providers/utility/utility";

@IonicPage()
@Component({
  selector: 'page-character-details',
  templateUrl: 'character-details.html',
})
export class CharacterDetailsPage implements OnInit {
  public character: Character = new Character();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _utility: UtilityProvider,
  ) {
  }

  ngOnInit(){
    this.character = this._utility.session.character;
  }

  public get name(){
    return this.character.name;
  }
  public get image(){
    return this._utility.getImage(this.character);
  }
  public get description(){
    return this.character.descritpion;
  }
  public get strength(){
    return this.character.strength;
  }

  public exit(){
    this.navCtrl.setRoot("CharactersListPage");
  }

}
