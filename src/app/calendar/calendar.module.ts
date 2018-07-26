import { CalendarEventService } from './../core/calendar-event.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarShowComponent } from './calendar-show/calendar-show.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CalendarShowComponent
  ],
  declarations: [
    CalendarShowComponent
  ],
  providers: [
    CalendarEventService
  ]
})
export class CalendarModule { }
