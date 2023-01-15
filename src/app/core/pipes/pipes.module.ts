import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortByDatePipe } from './sortByDate.pipe';
import { SearchPipe } from './search.pipe';
import { TimeAgoPipe } from './time-ago.pipe';
import { InitialsPipe } from './initials.pipe'; 
import { TicketIdPipe } from './ticket_id.pipe';
import { PriorityPipe } from './priority.pipe';
import { TypePipe } from './type.pipe';
import { StatusPipe } from './status.pipe';
import { SafeHtmlPipe } from './safehtml.pip';
import { SortByDateMilliPipe } from './sortByDateMilli.pipe';
import { SearchProjectsPipe } from './search-projects.pipe';
import { FilterPipe } from './filter.pipe';


@NgModule({
  declarations: [
    SortByDatePipe,
    SearchPipe,
    TimeAgoPipe,
    InitialsPipe,
    TicketIdPipe,
    PriorityPipe,
    TypePipe,
    StatusPipe,
    SafeHtmlPipe,
    SortByDateMilliPipe,
    SearchProjectsPipe,
    FilterPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SortByDatePipe,
    SearchPipe,
    TimeAgoPipe,
    InitialsPipe,
    TicketIdPipe,
    PriorityPipe,
    TypePipe,
    StatusPipe,
    SafeHtmlPipe,
    SortByDateMilliPipe,
    SearchProjectsPipe,
    FilterPipe
  ]
})
export class PipesModule { }
