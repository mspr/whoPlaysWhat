import { CalendarEventService } from './../core/calendar-event.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarShowComponent } from './calendar-show/calendar-show.component';
import { CalendarDayEventsUpdateComponent } from './calendar-day-events-update/calendar-day-events-update.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CalendarShowComponent,
    CalendarDayEventsUpdateComponent
  ],
  declarations: [
    CalendarShowComponent,
    CalendarDayEventsUpdateComponent
  ],
  providers: [
    CalendarEventService
  ]
})
export class CalendarModule { }
