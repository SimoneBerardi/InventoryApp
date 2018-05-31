import { Data } from "../data.model";
import { Theme } from "./theme.model";
import { DataProvider } from "../data-provider.model";

export class Options extends Data {
  language: string;
  units: Units = Units.Kg;
  decimals: Decimals = Decimals.Due;
  themeId: number = 9;

  private _theme: Theme;

  get theme() {
    return this._theme;
  }
  set theme(value: Theme) {
    this.themeId = value.id;
    this._theme = value;
  }

  constructor(
    _provider: DataProvider<Options>
  ) {
    super(
      _provider,
      [
        "language",
        "units",
        "decimals",
        "themeId",
      ]
    );
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