import { Jsonable } from "../shared/jsonable.model";

export class Character extends Jsonable {
  id: number;
  name: string;
  race: string;
  className: string;
  strength: number;
  image: string;

  constructor() {
    super(["id", "name", "race", "className", "strength", "image"]);
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
  get dragValue(){
    return parseFloat((this.strength * 30 * 0.453592).toFixed(2));
  }
  get liftValue(){
    return parseFloat((this.strength * 30 * 0.453592).toFixed(2));
  }
}