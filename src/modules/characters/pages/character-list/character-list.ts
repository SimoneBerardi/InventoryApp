import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { Character } from '../../character.model';
import { CharacterProvider } from '../../character.provider';
import { UtilityProvider } from '../../../shared/providers/utility.provider';
import { InterfaceProvider } from '../../../shared/providers/interface.provider';
import { SessionProvider } from '../../../shared/providers/session.provider';

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
    private _session: SessionProvider,
    private _utility: UtilityProvider,
    private _interface: InterfaceProvider,
    private _events: Events,
  ) {
    this.headerLogo = this._utility.images.logos.charactersList;
    this.headerTitle = "SalaEroi";

    this._events.unsubscribe("options:open");
    this._events.subscribe("options:open", () => {
      this.navCtrl.push("OptionsPage");
    });
  }

  ionViewDidLoad() {
    this._characters.load().then(() => {
      this.characters = this._characters.characters;
      this.isLoading = false;
    })
    // if (this.characters.length == 1 && !this.navParams.data.skipLoading) {
    //   this.select(this.characters[0]);
    // }
  }

  add() {
    this._interface.showModal("CharacterFormPage");
  }
  select(id: number) {
    this._session.characterId = id;
    return this.navCtrl.push("HomePage");
  }
  showOptions() {
    return this.navCtrl.push("OptionsPage");
  }

}
