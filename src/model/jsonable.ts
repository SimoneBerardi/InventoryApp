import "reflect-metadata";

export class Jsonable {
    /**
     * Carica tutte le proprietà di un oggetto json nella classe
     * @param jsonValue Oggetto json da caricare
     * @param skipPrivate Indica se saltare il caricamento delle proprietà private
     */
    fromJSON(jsonValue: any, skipPrivate: boolean = true) {
        if (jsonValue) {
            for (var prop in jsonValue)
                if (jsonValue.hasOwnProperty(prop)) {
                    if (!skipPrivate || !prop.startsWith("_")) {
                        let propJsonValue = jsonValue[prop];
                        let propValue = jsonValue[prop];
                        let metadata = getDeserializableMetadata(this, prop);
                        if (metadata) {
                            if (propJsonValue instanceof Array) {
                                propValue = [];
                                propJsonValue.forEach(element => {
                                    propValue.push(this._fromJSONDeserialize(metadata, element));
                                });
                            } else
                                propValue = this._fromJSONDeserialize(metadata, propJsonValue);
                        }
                        this[prop] = propValue;
                    }
                }
        }
    }

    /**
     * Salva tutte le proprietà dell'istanza in un oggetto json
     * @param instance Istanza dell'oggetto da salvare
     * @param skipPrivate Indica se saltare il salvataggio delle proprietà private
     */
    toJSON(instance: any, skipPrivate: boolean = true) {
        let jsonValue = {};
        if (instance) {
            for (var prop in instance)
                if (instance.hasOwnProperty(prop))
                    if (!skipPrivate || !prop.startsWith("_")) {
                        let metadata = getSerializableMetadata(instance, prop);
                        if (!metadata || metadata.isSerializable)
                            jsonValue[prop] = instance[prop];
                    }
        }
        return jsonValue;
    }

    private _fromJSONDeserialize(metadata: DeserializableMetadata, propJsonValue: any) {
        // console.log("Deserializzazione " + metadata.propertyType + " ...");
        let result = new metadata.propertyType() as Jsonable;
        result.fromJSON(propJsonValue);
        return result;
    }
}

const serializableMetadataKey = Symbol("Serializable");

export interface SerializableMetadata {
    isSerializable: boolean;
}

export function Serializable(isSerializable: boolean = true): PropertyDecorator {
    const metadata: SerializableMetadata = { isSerializable };
    return Reflect.metadata(serializableMetadataKey, metadata);
}
export function getSerializableMetadata(target: any, propertyKey: string): SerializableMetadata {
    return Reflect.getMetadata(serializableMetadataKey, target, propertyKey);
}

const deserializableMetadataKey = Symbol("Deserializable");

export interface DeserializableMetadata {
    propertyType: any;
}

export function Deserializable(propertyType: any): PropertyDecorator {
    const metadata: DeserializableMetadata = { propertyType };
    return Reflect.metadata(deserializableMetadataKey, metadata);
}
export function getDeserializableMetadata(target: any, propertyKey: string): DeserializableMetadata {
    return Reflect.getMetadata(deserializableMetadataKey, target, propertyKey);
}