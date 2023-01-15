import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {
  transform(value: any): any {
    if(value === 0) {
        return 'Bug';
    } else if(value === 1) {
        return 'Feature';
    } else if(value === 2) {
        return 'Task';
    } else  {
        return 'None';        
    }
  }
}