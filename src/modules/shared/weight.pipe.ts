import { Pipe, PipeTransform } from '@angular/core';
import { OptionsProvider } from '../shared/providers/options.provider';
import { Units } from '../shared/options.model';

@Pipe({ name: "weight" })
export class WeightPipe implements PipeTransform {

  constructor(
    private _options: OptionsProvider
  ) { }

  transform(value: number, rounded: boolean): string {
    let result = rounded ? value.toFixed(this._options.decimals) : value.toString();
    return result + " " + Units[this._options.units].toString();
  }
}