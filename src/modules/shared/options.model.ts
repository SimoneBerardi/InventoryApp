import { Jsonable } from "../shared/jsonable.model";

export class Options extends Jsonable {
  language: string;
  baseColor: string = "#333333";
  contrastColor: string = "#D3B158";

  constructor() {
    super(["language", "baseColor", "contrastColor"]);
  }
}