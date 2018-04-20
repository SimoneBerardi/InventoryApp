import { Component, Input } from '@angular/core';
import { OptionsProvider, Theme } from '../../providers/options/options';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Events } from 'ionic-angular/util/events';

@Component({
  selector: 'page-header',
  templateUrl: 'page-header.html'
})
export class PageHeaderComponent {

  @Input() logo: string;
  @Input() title: string;

  theme: Theme;

  constructor(
    public navCtrl: NavController,
    private _options: OptionsProvider,
    private _events: Events,
  ) {
    this.theme = this._options.theme;
  }

  showOptions() {
    this._events.publish("options:open");
  }
}
