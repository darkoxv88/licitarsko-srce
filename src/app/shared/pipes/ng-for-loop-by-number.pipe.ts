import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'LoopByNumber'
})
export class NgForLoopByNumberPipe implements PipeTransform {
  transform(value: number):  Array<number> {
    if (typeof(value) !== 'number') return new Array<number>();

    let res = new Array<number>(value);

    return res;
  }
}