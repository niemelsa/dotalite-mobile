import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArray',
})
export class FilterArrayPipe implements PipeTransform {
  transform(value: any[], amount: number = 5): any[] {
    return value.length
      ? value.filter((element, index) => index < amount)
      : null;
  }
}
