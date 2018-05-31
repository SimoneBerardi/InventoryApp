// import { DataArray } from "./data-array.mode";
// import { Data } from "./data.model";
// import { MemoryProvider } from "./memory-provider.model";

// export class MemoryArray<T extends Data> extends DataArray<T>{

//   constructor(
//     _provider: MemoryProvider<T>,
//     items?: T[],
//   ) {
//     super(_provider, items);
//     Object.setPrototypeOf(this, DataArray.prototype);
//   }

//   filter(callbackfn: (value: T, index: number, array: MemoryArray<T>) => any, thisArg?: any): MemoryArray<T> {
//     return new MemoryArray<T>(this._provider as MemoryProvider<T>, super.filter(callbackfn));
//   }
// }