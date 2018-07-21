import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Events } from 'ionic-angular/util/events';
import { UtilityProvider } from '../../providers/utility.provider';

@Component({
  selector: 'page-header',
  templateUrl: 'page-header.html'
})
export class PageHeaderComponent {
  @Input() logo: string;
  @Input() title: string;
  @Input() isOptionsHidden: boolean;

  constructor(
    public navCtrl: NavController,
    private _events: Events,
    private _utility: UtilityProvider,
  ) { }

  get optionsImage(){
    return this._utility.images.options.button;
  }
  get bottomBorder(){
    return this._utility.images.barTop;
  }

  showOptions() {
    this._events.publish("Options:open");
  }
}
