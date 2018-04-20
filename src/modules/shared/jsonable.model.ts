export class Jsonable {
  constructor(
    private _props: string[],
  ) { }

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