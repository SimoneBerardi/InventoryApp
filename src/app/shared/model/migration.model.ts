import { Data } from "../data.model";
import { DataProvider } from "../data-provider.model";

export class Migration extends Data {
  version: string;
  isComplete: boolean;
  dateCompleted: Date;

  constructor(
    _provider: DataProvider<Migration>
  ) {
    super(
      _provider,
      [
        "version",
        "isComplete",
        "dateCompleted"
      ]
    );
  }
}