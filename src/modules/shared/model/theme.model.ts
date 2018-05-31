import { Data } from "../data.model";
import { DataProvider } from "../data-provider.model";

export class Theme extends Data {
  name: string;
  baseColor: string;
  contrastColor: string;

  constructor(
    _provider: DataProvider<Theme>,
  ) {
    super(
      _provider,
      [
        "name",
        "baseColor",
        "contrastColor"
      ]
    );
  }
}