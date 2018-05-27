import { Jsonable } from "./jsonable.model";

export class Migration extends Jsonable {
  version: string;
  isComplete: boolean;
  dateCompleted: Date;

  constructor() {
    super(["version", "isComplete", "dateCompleted"]);
  }
}