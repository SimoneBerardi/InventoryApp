export class JsonObject {
    public static parse<T extends JsonObject>(type: { new (): T; }, json: any): T {
        let result = new type();
        for (let prop in result)
            if (result.hasOwnProperty(prop) && json[prop] != undefined)
                result[prop] = json[prop];
        return result;
    }
}