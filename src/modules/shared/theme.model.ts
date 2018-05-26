import { Jsonable } from "./jsonable.model";

export class Theme extends Jsonable {
  name: string;
  baseColor: string;
  contrastColor: string;

  constructor() {
    super(["name", "baseColor", "contrastColor"]);
  }
}