import { Jsonable } from "../shared/jsonable.model";
import { Theme } from "./theme.model";

export class Options extends Jsonable {
  language: string;
  units: Units = Units.Kg;
  decimals: Decimals = Decimals.Due;
  themeId: number = 7;

  private _theme: Theme;

  get theme() {
    return this._theme;
  }
  set theme(value: Theme) {
    this.themeId = value.id;
    this._theme = value;
  }

  constructor() {
    super(["language", "units", "decimals", "themeId"]);
    this.id = 1;
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