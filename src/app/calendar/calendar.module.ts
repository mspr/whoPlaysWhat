import { CalendarService } from './../core/calendar.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarShowComponent } from './calendar-show/calendar-show.component';
import { CalendarDayEventsUpdateComponent } from './calendar-day-events-update/calendar-day-events-update.component';
import { CalendarDayEventsOverviewComponent } from './calendar-day-events-overview/calendar-day-events-overview.component';
import { CalendarDayEventsShowComponent } from './calendar-day-events-show/calendar-day-events-show.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    CalendarShowComponent,
    CalendarDayEventsOverviewComponent
  ],
  declarations: [
    CalendarShowComponent,
    CalendarDayEventsUpdateComponent,
    CalendarDayEventsOverviewComponent,
    CalendarDayEventsShowComponent
  ],
  providers: [
    CalendarService
  ]
})

export class CalendarModule { }
