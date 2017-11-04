import { Storage } from '@ionic/storage';
import { Jsonable } from './jsonable';

export class Storageable extends Jsonable {

    constructor(
        protected _storage: Storage,
        protected _storageKey: string,
    ) {
        super();
    }
    /**
     * Carica l'istanza dal supporto di storage
     */
    load() {
        return this._storage.get(this._storageKey).then(jsonValue => {
            return this.fromJSON(jsonValue);
        });
    }
    /**
     * Salva l'istanza sul supporto di storage
     */
    save() {
        return this._storage.set(this._storageKey, this.toJSON(this));
    }
    /**
     * Cancella l'istanza dal supporto di storage
     */
    delete() {
        return this._storage.remove(this._storageKey);
    }
}