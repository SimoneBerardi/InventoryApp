import { DataProvider } from "./data-provider.model";

export class Data {
  id: number;

  constructor(
    private _provider: DataProvider<Data>,
    private _props: string[],
  ) {
    this._props.unshift("id");
  }

  save(isDeep: boolean = false): Promise<void> {
    if (this.id)
      return this._provider.modify(this.id, this);
    else
      return this._provider.add(this);
  }

  delete(): Promise<void> {
    if (!this.id)
      throw new Error("Jsonable: ImpossibileCancellare");

    return this._provider.delete(this.id);
  }

  toJson(): any {
    let json = {};
    this._props.forEach(prop => {
      json[prop] = this[prop];
    });
    return json;
  }

  fromJson(json: any): void {
    this._props.forEach(prop => {
      this[prop] = json[prop];
    });
  }
}