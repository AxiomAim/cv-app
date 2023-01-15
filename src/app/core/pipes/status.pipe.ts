import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  transform(value: any): any {
    if(value == 'Open') {
      return "To Do";
    } else if (value == 'NeedInfo') {
      return "Need Info";
    } else if (value == 'InProgress') {
      return "In Progress";
    } else if (value == 'Review') {
      return "In Review";
    } else if (value == 'Close') {
      return "Done";
    }
    // if(value === 0) {
    //     return 'To Do';
    // } else if(value === 1) {
    //     return 'In Progress';
    // } else if(value === 2) {
    //     return 'Testing';
    // } else  {
    //     return 'Done';        
    // }
  }
}