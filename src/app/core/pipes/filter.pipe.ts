import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
  })
  export class FilterPipe implements PipeTransform {
    transform(items: Array<any>, filter: {[key: string]: any }): Array<any> {
      return items.filter(item => {
        let matches = Object.keys(filter).every(f => {
          return filter[f] === 'All' || item[f] == filter[f];
        })
  
        return matches;
      })
    }
  }