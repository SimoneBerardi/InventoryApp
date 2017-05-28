export class JsonObject {
    public parse(json: any) {
        for (let prop in json)
            if (json.hasOwnProperty(prop)) {
                if (this[prop] instanceof JsonObject || this[prop] instanceof JsonArray) {
                    this[prop].parse(json[prop])
                } else
                    this[prop] = json[prop];
            }
    }

    public static parse<T extends JsonObject>(type: { new (): T; }, json: any): T {
        let result = new type();
        result.parse(json);
        return result;
    }
}

export class JsonArray<T extends JsonObject> extends Array {
    public arrayType;
    constructor(arrayType: { new (): T; }) {
        super();
        Object.setPrototypeOf(this, JsonArray.prototype);
        this.arrayType = arrayType;
    }

    public parse(json: any[]) {
        json.forEach(jsonElement => {
            let element = new this.arrayType();
            element.parse(jsonElement);
            this.push(element);
        });
    }
    public static parse<T extends JsonObject>(type: { new (): T; }, json: any[]): T[] {
        let result = new JsonArray<T>(type);
        result.parse(json);
        return result;
    }
}