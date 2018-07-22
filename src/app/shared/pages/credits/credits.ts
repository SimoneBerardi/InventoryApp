import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilityProvider } from '../../providers/utility.provider';

@IonicPage()
@Component({
  selector: 'page-credits',
  templateUrl: 'credits.html',
})
export class CreditsPage {

  headerLogo: string;
  headerTitle: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _utility: UtilityProvider,
  ) {
    this.headerLogo = this._utility.images.shared.credits.logo;
    this.headerTitle = "Crediti";
  }

  get icon() {
    return this._utility.images.shared.credits.icon;
  }
  get name(){
    return this._utility.images.shared.credits.name;
  }
  get version() {
    return this._utility.manifest.version;
  }
  get simoAvatar() {
    return this._utility.images.shared.credits.simoAvatar;
  }
  get mauroAvatar() {
    return this._utility.images.shared.credits.mauroAvatar;
  }
  get atImage(){
    return this._utility.images.shared.credits.emailLogo;
  }
  get symbolImage(){
    return this._utility.images.shared.credits.symbol;
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
