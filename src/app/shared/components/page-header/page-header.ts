import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Events } from 'ionic-angular/util/events';

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
  ) { }

  showOptions() {
    this._events.publish("Options:open");
  }
}
