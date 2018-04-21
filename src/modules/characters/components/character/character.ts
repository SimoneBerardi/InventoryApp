import { Component, Input } from '@angular/core';
import { Character } from '../../character.model';

@Component({
  selector: 'character',
  templateUrl: 'character.html'
})
export class CharacterComponent {
  @Input() character: Character;

  constructor() { }

  get image() {
    return this.character.image;
  }
  get name() {
    return this.character.name;
  }
  get description() {
    return this.character.description;
  }

}
