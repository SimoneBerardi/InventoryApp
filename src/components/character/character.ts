import { Component, Input } from '@angular/core';
import { Character } from "../../model/character";
import { UtilityProvider } from "../../providers/utility/utility";
import { Events } from "ionic-angular";

@Component({
  selector: 'character',
  templateUrl: 'character.html'
})
export class CharacterComponent {
  @Input() character: Character;

  constructor(
    private _utility: UtilityProvider,
    private _events: Events,
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

  public select() {
    this._events.publish("character:select", this.character);
  }

}
