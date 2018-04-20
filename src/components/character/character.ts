import { Component, Input } from '@angular/core';
import { Character } from "../../model/character";
import { UtilityProviderOld } from "../../providers/utility/utility";
import { OptionsProvider } from '../../providers/options/options';

@Component({
  selector: 'character',
  templateUrl: 'character.html'
})
export class CharacterComponent {
  @Input() character: Character;

  constructor(
    private _utility: UtilityProviderOld,
    private _options: OptionsProvider,
  ) {
  }

  get image() {
    return this._utility.getCharacterImage(this.character);
  }
  get name() {
    return this.character.name;
  }
  get description() {
    return this.character.description;
  }
  get itemStyle() {
    return {
      "background-image": `radial-gradient(circle at -3%, rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 40px, ${this._options.theme.contrastColor} 40px)`,
      "color": this._options.theme.baseColor,
    }
  }

}
