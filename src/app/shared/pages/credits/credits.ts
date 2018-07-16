import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilityProvider } from '../../providers/utility.provider';

@IonicPage()
@Component({
  selector: 'page-credits',
  templateUrl: 'credits.html',
})
export class CreditsPage {

  headerTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _utility: UtilityProvider,
  ) {
    this.headerTitle = "Crediti";
  }

  get logo() {
    return this._utility.images.credits.logo;
  }

  get name(){
    return this._utility.images.credits.name;
  }

  get version() {
    return this._utility.manifest.version;
  }

  get simoAvatar() {
    return this._utility.images.credits.simoAvatar;
  }

  get mauroAvatar() {
    return this._utility.images.credits.mauroAvatar;
  }

  sendEmail(recipient: string) {
    let address = this._utility.emails[recipient];
    let subject = "Adventure Bag - Crediti"
    window.open(`mailto:${address}?subject=${subject}`, '_system');
  }
  cancel() {
    this.navCtrl.pop();
  }

}
