import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Character } from '../../character.model';
import { CharacterProvider } from '../../character.provider';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { InterfaceProvider } from '../../../shared/providers/interface.provider';

@IonicPage()
@Component({
  selector: 'page-character-list',
  templateUrl: 'character-list.html',
})
export class CharacterListPage {
  headerLogo: string;
  headerTitle: string;

  isLoading: boolean;
  characters: Character[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _characters: CharacterProvider,
    private _utility: UtilityProvider,
    private _interface: InterfaceProvider,
    private _events: Events,
  ) {
    this.headerLogo = this._utility.images.logos.charactersList;
    this.headerTitle = "SalaEroi";
  }

  ionViewDidLoad() {
    this._events.subscribe("Options:open", () => {
      this.navCtrl.push("OptionsPage");
    });
    this._events.subscribe("Interface:exit", () => {
      this.navCtrl.popToRoot();
    });
    this._characters.getAll().then(characters => {
      this.characters = characters;
      this.isLoading = false;
    });
    this._welcomeMessage();
  }
  ionViewWillUnload() {
    this._events.unsubscribe("Options:open");
    this._events.unsubscribe("Character:delete");
  }

  add() {
    this._interface.showModal("CharacterFormPage");
  }
  select(id: number) {
    this._characters.loadCharacter(id);
    return this.navCtrl.push("HomePage");
  }
  showOptions() {
    return this.navCtrl.push("OptionsPage");
  }

  private _welcomeMessage(){
    if(this._utility.manifest.isDebug){
      this._interface.showAlert({
        title: "VersioneDebug",
        message: "MessaggioVersioneDebug"
      });
    } else if(this._utility.manifest.isBeta){
      this._interface.showAlert({
        title: "VersioneBeta",
        message: "MessaggioVersioneBeta"
      });
    }
  }

}
