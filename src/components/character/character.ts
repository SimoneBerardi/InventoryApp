import { Component, Input } from '@angular/core';
import { Character } from "../../model/character";
import { UtilityProvider } from "../../providers/utility/utility";

@Component({
  selector: 'character',
  templateUrl: 'character.html'
})
export class CharacterComponent {
  @Input() character: Character;

  constructor(
    private _utility: UtilityProvider,
  ) {
  }

  public get image() {
    return this._utility.getImage(this.character);
  }
  public get name() {
    return this.character.name;
  }
  public get description() {
    return this.character.description;
  }

}
