import { Jsonable } from "../shared/jsonable.model";

export class Item extends Jsonable {
  characterId: number;
  
  name: string;
  description: string;
  weight: number;
  category: ItemCategory;

  constructor() {
    super(["characterId", "name", "description", "weight", "category"]);
  }
}

export enum ItemCategory {
  Armi,
  Armature,
  OggettiSemplici,
  OggettiMagici,
}