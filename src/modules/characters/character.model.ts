import { Data } from "../shared/data.model";
import { Encumberance } from "./encumberance.model";
import { DataProvider } from "../shared/data-provider.model";

export class Character extends Data {
  name: string;
  race: string;
  className: string;
  size: CharacterSize;
  strength: number;
  edition: Edition;
  image: string;

  encumberance: Encumberance;

  constructor(
    _provider: DataProvider<Character>
  ) {
    super(
      _provider,
      [
        "name",
        "race",
        "className",
        "size",
        "strength",
        "edition",
        "image"
      ]
    );
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