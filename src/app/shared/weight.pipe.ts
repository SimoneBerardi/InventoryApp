import { Pipe, PipeTransform } from '@angular/core';
import { OptionsProvider } from '../shared/providers/options.provider';
import { Units } from '../shared/model/options.model';

@Pipe({ name: "weight" })
export class WeightPipe implements PipeTransform {

  constructor(
    private _options: OptionsProvider
  ) { }

  transform(value: number, rounded: boolean): string {
    let result = value.toString();
    if (rounded)
      result = value.toFixed(this._options.decimals);
    else {
      let decimalPlaces = 0;
      if (Math.floor(value) !== value)
        decimalPlaces = value.toString().split(".")[1].length || 0;
      if (decimalPlaces > 3)
        result = value.toFixed(3);
    }
    return result + " " + Units[this._options.units].toString();
  }
}