import { Jsonable } from "../shared/jsonable.model";

export class Item extends Jsonable {
  id: number;
  name: string;
  description: string;
  weight: number;
  category: ItemCategory;

  constructor() {
    super(["id", "name", "description", "weight", "category"]);
  }
}

export enum ItemCategory {
  Armi,
  Armature,
  Oggetti,
}