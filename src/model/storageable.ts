import { Storage } from '@ionic/storage';
import { JsonableOld } from './jsonable';

export class Storageable extends JsonableOld {

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
    let json = this.toJSON(this);
    return this._storage.set(this._storageKey, json);
  }
  /**
   * Cancella l'istanza dal supporto di storage
   */
  remove() {
    return this._storage.remove(this._storageKey);
  }
}