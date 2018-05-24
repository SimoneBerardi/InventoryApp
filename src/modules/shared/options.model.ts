import { Jsonable } from "../shared/jsonable.model";

export class Options extends Jsonable {
  language: string;
  units: Units = Units.Kg;
  decimals: Decimals = Decimals.Due;
  baseColor: string = "#333333";
  contrastColor: string = "#D3B158";

  constructor() {
    super(["language", "units", "decimals", "baseColor", "contrastColor"]);
  }
}

export enum Units {
  Kg,
  Lb,
}

export enum Decimals {
  Zero = 0,
  Uno = 1,
  Due = 2,
  Tre = 3,
}