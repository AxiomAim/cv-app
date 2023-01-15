import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  // searching the user data
  // transform(accounts: any[], data: [[any], any]): any {
  //   let excludedIds = data[0];
  //   var term: string = data[1]
  //   if (!accounts) {
  //     return;
  //   } else if (!excludedIds) {
  //     return accounts;
  //   } else if (excludedIds && !term) {
  //     return accounts.filter((account) => excludedIds.indexOf(account.userId) == -1);
  //   } else {
  //     term = term.toLowerCase();
  //     return accounts.filter((account) => excludedIds.indexOf(account.userId) == -1 && (account.name.toLowerCase().indexOf(term) > -1 || account.username.toLowerCase().indexOf(term) > -1));
  //   }
  // }

  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if(!terms) return items;
    terms = terms.toLowerCase();
    return items.filter( it => {
      return it.name.toLowerCase().includes(terms); // only filter country name
    });
  }
}
