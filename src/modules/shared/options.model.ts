import { Jsonable } from "../shared/jsonable.model";

export class Options extends Jsonable {
  language: string;
  units: Units = Units.Kg;
  decimals: number = 0;
  baseColor: string = "#333333";
  contrastColor: string = "#D3B158";

  constructor() {
    super(["language", "units", "decimals", "baseColor", "contrastColor"]);
  }
}

export enum Units {
  Kg,
  Lb
}