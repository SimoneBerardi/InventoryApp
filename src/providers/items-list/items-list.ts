import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Item } from '../../model/item';
import { Storageable } from '../../model/storageable';
import { Storage } from '@ionic/storage';
import { Serializable, Deserializable } from '../../model/jsonable';
import { OptionsProvider } from '../options/options';
import { CharactersListProvider } from '../characters-list/characters-list';

@Injectable()
export class ItemsListProvider extends Storageable {

  @Serializable(false)
  items: Item[];
  @Serializable(false)
  weaponItems: Item[];
  @Serializable(false)
  armorItems: Item[];
  @Serializable(false)
  simpleItems: Item[];
  @Deserializable(Item)
  customItems: Item[];

  constructor(
    _storage: Storage,
    private _http: Http,
    private _options: OptionsProvider,
    private _characters: CharactersListProvider,
  ) {
    super(_storage, "inventoryApp_items");
    this.items = new Array<Item>();
    this.weaponItems = new Array<Item>();
    this.armorItems = new Array<Item>();
    this.simpleItems = new Array<Item>();
    this.customItems = new Array<Item>();
  }

  /**
   * Restituisce l'oggetto in base all'id
   */
  get(id: number) {
    return this.items.filter(item => item.id == id)[0];
  }
  /**
   * Aggiunge un oggetto custom e salva la lista
   * @param item 
   */
  add(item: Item) {
    item.id = this._generateItemId();
    this.items.push(item);
    this.simpleItems.push(item);
    this.customItems.push(item);
    this._sortItems();
    return this.save().then(() => {
      return item;
    });
  }
  /**
   * Rimuove un oggetto custom e salva la lista
   * @param item 
   */
  remove(item: Item) {
    this._characters.removeItem(item);
    this.items.splice(this.items.indexOf(item), 1);
    this.simpleItems.splice(this.simpleItems.indexOf(item), 1);
    this.customItems.splice(this.customItems.indexOf(item), 1);
    return this.save();
  }
  /**
   * Override
   */
  load() {
    return super.load().then(() => {
      this.customItems.forEach(customItem => {
        this.items.push(customItem);
      });
      return this._loadItems();
    }).then(() => {
      return this._sortItems();
    });
  }

  /**
   * Ordina gli oggetti e tutte le cache
   */
  private _sortItems() {
    this.items.sort(Item.sort);
    this.armorItems.sort(Item.sort);
    this.weaponItems.sort(Item.sort);
    this.simpleItems.sort(Item.sort);
  }
  /**
   * Carica tutti gli oggetti dal file json in lingua
   */
  private _loadItems() {
    let fileName = "assets/items." + this._options.language + ".json";
    return this._http.get(fileName).toPromise().then(value => {
      value.json().items.forEach(jsonItem => {
        let item = new Item();
        item.fromJSON(jsonItem);
        this.items.push(item);
        this._loadItemIntoCache(item);
      });
      return;
    });
  }
  /**
   * Carica un oggetto nella cache relativa
   * @param item 
   */
  private _loadItemIntoCache(item: Item) {
    if (item.tags.indexOf("weapons") >= 0)
      this.weaponItems.push(item);
    if (item.tags.indexOf("armors") >= 0)
      this.armorItems.push(item);
    if (item.tags.indexOf("items") >= 0)
      this.simpleItems.push(item);
  }
  /**
   * Genera un id progressivo per un oggetto
   */
  private _generateItemId() {
    let result = 1;
    if (this.items.length > 0)
      result = Math.max.apply(this, this.items.map(item => item.id)) + 1;
    return result;
  }

}
