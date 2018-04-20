import { Component, Input } from '@angular/core';
import { Character } from '../../character.model';
import { OptionsProvider } from '../../../shared/providers/options.provider';

@Component({
  selector: 'character',
  templateUrl: 'character.html'
})
export class CharacterComponent {
  @Input() character: Character;

  constructor(
    private _options: OptionsProvider,
  ) {
  }

  get image() {
    return this.character.image;
  }
  get name() {
    return this.character.name;
  }
  get description() {
    return this.character.description;
  }
  get itemStyle() {
    return {
      "background-image": `radial-gradient(circle at -3%, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 40px, ${this._options.contrastColor} 40px)`,
      "color": this._options.baseColor,
    }
  }

}
