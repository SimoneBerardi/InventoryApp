import { Data } from "../shared/data.model";
import { ItemGroup } from "./item-group.model";
import { DataProvider } from "../shared/data-provider.model";

export class Item extends Data {
  characterId: number;
  name: string;
  description: string;
  weight: number;
  category: ItemCategory;
  isFavorite: boolean;

  totalQuantity: number = 0;

  constructor(
    _provider: DataProvider<Item>,
  ) {
    super(
      _provider,
      [
        "characterId",
        "name",
        "description",
        "weight",
        "category",
        "isFavorite"
      ]
    );
  }
}

export enum ItemCategory {
  Armi,
  Armature,
  OggettiSemplici,
  OggettiMagici,
}