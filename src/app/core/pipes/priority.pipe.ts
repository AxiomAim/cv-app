import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priority'
})
export class PriorityPipe implements PipeTransform {
  transform(value: any): any {
    if(value === 1) {
        return 'Low';
    } else if(value === 2) {
        return 'Medium';
    } else if(value === 3) {
        return 'High';
    } else  {
        return 'None';        
    }
  }
}