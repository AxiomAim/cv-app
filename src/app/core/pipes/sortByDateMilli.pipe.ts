import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByDateMilli'
})
export class SortByDateMilliPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const sortedValues = value.sort((a, b) => new Date(b.created_at * 1000).getTime() - new Date(a.created_at * 1000).getTime());
    return sortedValues;
  }
}