export class Jsonable {
  id: number;

  constructor(
    private _props: string[],
  ) { 
    this._props.unshift("id");
  }

  toJson(): any {
    let json = {};
    this._props.forEach(prop => {
      json[prop] = this[prop];
    });
    return json;
  }

  fromJson(json: any) {
    this._props.forEach(prop => {
      this[prop] = json[prop];
    });
  }
}