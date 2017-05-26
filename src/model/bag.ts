import { BagItem } from "./bagItem";

export class Bag {
    public id: number;
    public characterId: number;
    public name: string;
    public weight: number;
    public isEquipped: boolean;
    public isFixedWeight: boolean;

    public items: BagItem[];

    public get totalWeight() {
        let result = this.weight;
        if (!this.isFixedWeight)
            result += this.items.map(item => item.weight).reduce((a, b) => a + b, 0)
        return result;
    }
}