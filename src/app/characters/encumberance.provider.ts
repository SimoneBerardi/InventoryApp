import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character, Edition, CharacterSize } from './character.model';
import { Encumberance } from './encumberance.model';
import { OptionsProvider } from '../shared/providers/options.provider';
import { Units } from '../shared/model/options.model';

@Injectable()
export class EncumberanceProvider {
  private _carry_3_5_Url: string = "assets/carry_3_5.json";
  private _carry_3_5: any = null;

  constructor(
    private _http: HttpClient,
    private _options: OptionsProvider,
  ) { }

  load() {
    return this._http.get(this._carry_3_5_Url).toPromise().then(table => {
      this._carry_3_5 = table;
      return Promise.resolve();
    });
  }

  calculateEncumberance(character: Character) {
    let encumerance = null;
    switch (character.edition) {
      case Edition.Tre_Cinque:
        encumerance = this._calculate_35_encumberance(character);
        break;
      case Edition.Cinque_Zero:
        encumerance = this._calculate_50_encumberance(character);
        break;
    }
    return encumerance;
  }

  private _calculate_35_encumberance(character: Character) {
    let encumberance = new Encumberance();
    let multiplier = 1;
    let strength = character.strength;
    while (strength > 29) {
      strength -= 10;
      multiplier *= 4;
    }
    let units = this._options.units === Units.Kg ? "kg" : "lb";
    let tableValues = this._carry_3_5[units][strength];
    let sizeMultiplier = 1;
    switch (character.size) {
      case CharacterSize.Piccola:
        sizeMultiplier = 0.75;
        break;
      case CharacterSize.Grande:
        sizeMultiplier = 2;
        break;
    }
    encumberance.encumbered = tableValues.l * multiplier * sizeMultiplier;
    encumberance.heavilyEncumbered = tableValues.m * multiplier * sizeMultiplier;
    encumberance.maxCarry = tableValues.h * multiplier * sizeMultiplier;
    encumberance.lift = encumberance.maxCarry * 2;
    encumberance.drag = encumberance.maxCarry * 5;
    return encumberance;
  }
  private _calculate_50_encumberance(character: Character) {
    let encumerance = new Encumberance();
    let unitsMultiplier = this._options.units === Units.Kg ? 1 : 2;
    let sizeMultiplier = 1;
    switch (character.size) {
      case CharacterSize.Piccola:
        sizeMultiplier = 0.5;
        break;
      case CharacterSize.Grande:
        sizeMultiplier = 2;
        break;
    }
    encumerance.encumbered = character.strength * 2.5 * unitsMultiplier * sizeMultiplier;
    encumerance.heavilyEncumbered = character.strength * 5 * unitsMultiplier * sizeMultiplier;
    encumerance.maxCarry = character.strength * 7.5 * unitsMultiplier * sizeMultiplier;
    encumerance.drag = encumerance.lift = character.strength * 15 * unitsMultiplier * sizeMultiplier;
    return encumerance;
  }
}