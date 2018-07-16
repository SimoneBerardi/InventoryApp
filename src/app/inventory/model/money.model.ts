import { Data } from "../../shared/data.model";
import { DataProvider } from "../../shared/data-provider.model";

export class Money extends Data {
  inventoryId: number;
  copper: number = 0;
  silver: number = 0;
  electrum: number = 0;
  gold: number = 0;
  platinum: number = 0;
  ignoreWeight: boolean;

  constructor(
    _provider: DataProvider<Money>,
  ) {
    super(
      _provider,
      [
        "inventoryId",
        "copper",
        "silver",
        "electrum",
        "gold",
        "platinum",
        "ignoreWeight"
      ]
    );
  }

  get hasValue() {
    return this.copper > 0 ||
      this.silver > 0 ||
      this.electrum > 0 ||
      this.gold > 0 ||
      this.platinum > 0;
  }
  get weight() {
    return this.ignoreWeight ? 0 : (this.copper +
      this.silver +
      this.electrum +
      this.gold +
      this.platinum) / 50 * 0.5;
  }
}