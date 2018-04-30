import { Jsonable } from "../../shared/jsonable.model";

export class Money extends Jsonable {
  characterId: number;
  copper: number = 0;
  silver: number = 0;
  electrum: number = 0;
  gold: number = 0;
  platinum: number = 0;

  constructor() {
    super(["characterId", "copper", "silver", "electrum", "gold", "platinum"]);
  }

  get hasValue() {
    return this.copper > 0 ||
      this.silver > 0 ||
      this.electrum > 0 ||
      this.gold > 0 ||
      this.platinum > 0;
  }
  get weight() {
    return (this.copper +
      this.silver +
      this.electrum +
      this.gold +
      this.platinum) / 50 * 0.5;
  }
}