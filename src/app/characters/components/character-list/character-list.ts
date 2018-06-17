import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../../character.model';

@Component({
  selector: 'character-list',
  templateUrl: 'character-list.html',
})
export class CharacterListComponent {
  @Input() characters: Character[];
  @Output() onSelect: EventEmitter<number> = new EventEmitter();

  constructor() { }

  select(id: number) {
    this.onSelect.emit(id);
  }
}
