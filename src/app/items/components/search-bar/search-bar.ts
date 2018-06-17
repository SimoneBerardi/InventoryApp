import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'search-bar',
  templateUrl: 'search-bar.html'
})
export class SearchBarComponent {
  searchValue: string = "";
  searchControl: FormControl;

  @Output() onInput: EventEmitter<null> = new EventEmitter();
  @Output() onSearch: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.searchControl = new FormControl();
    this.searchControl.valueChanges.debounceTime(700).subscribe(value => {
      this.onSearch.emit(value);
    });
  }

  onSearchInput() {
    this.onInput.emit();
  }

  clear(){
    this.onInput.emit();
    this.searchValue = "";
  }

}
