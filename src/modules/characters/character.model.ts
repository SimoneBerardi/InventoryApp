import { Jsonable } from "../shared/jsonable.model";
import { Encumberance } from "./encumberance.model";

export class Character extends Jsonable {
  name: string;
  race: string;
  className: string;
  size: CharacterSize;
  strength: number;
  edition: Edition;
  image: string;

  encumberance: Encumberance;

  constructor() {
    super(["name", "race", "className", "size", "strength", "edition", "image"]);
  }

  get description() {
    return this.className + " - " + this.race;
  }
}

export enum CharacterSize {
  Piccola,
  Media,
  Grande
}

export enum Edition {
  Tre_Cinque,
  Cinque_Zero,
}