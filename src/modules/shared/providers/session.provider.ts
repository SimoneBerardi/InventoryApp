import { Injectable } from '@angular/core';
import { Character } from '../../characters/character.model';

@Injectable()
export class SessionProvider {
  characterId: number;

  constructor() { }
}
