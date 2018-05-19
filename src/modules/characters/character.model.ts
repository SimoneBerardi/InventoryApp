import { Jsonable } from "../shared/jsonable.model";

export class Character extends Jsonable {
  name: string;
  race: string;
  className: string;
  strength: number;
  image: string;
  size: CharacterSize;

  constructor() {
    super(["name", "race", "className", "strength", "image", "size"]);
  }

  get description() {
    return this.className + " - " + this.race;
  }
  get encumberedValue() {
    return parseFloat((this.strength * 5 * 0.453592).toFixed(2));
  }
  get heavilyEncumberedValue() {
    return parseFloat((this.strength * 10 * 0.453592).toFixed(2));
  }
  get maxCarryValue() {
    return parseFloat((this.strength * 15 * 0.453592).toFixed(2));
  }
  get dragValue() {
    return parseFloat((this.strength * 30 * 0.453592).toFixed(2));
  }
  get liftValue() {
    return parseFloat((this.strength * 30 * 0.453592).toFixed(2));
  }
}

export enum CharacterSize {
  Piccola,
  Media,
  Grande
}

//TODO Ragionare su come gestire l'edizione, partirei solo con 3.5 e 5
export enum Edition {
  Three_Five,
  Four_Zero,
  Five_Zero,
}