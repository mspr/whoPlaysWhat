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
  declarations: [CalendarShowComponent]
})
export class CalendarModule { }
