import { Item, ItemCategory } from "./item.model";

export class ItemGroup {
  category: ItemCategory;
  name: string;
  items: Item[];
  isOpen: boolean;
}