import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'wpw-calendar-day-events-update',
  templateUrl: './calendar-day-events-update.component.html',
  styleUrls: ['./calendar-day-events-update.component.scss']
})

export class CalendarDayEventsUpdateComponent implements OnInit
{
  public frequencies = ["Once", "Once per month", "Once per week", "Every day"];
  public frequencyColors = ["rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"];

  constructor()
  {
  }

  ngOnInit()
  {
  }

  updateFrequency(idx: number)
  {
    if (idx == 0)
    {
      this.frequencyColors = ["rgba(205, 234, 125, 0.5)", "rgba(0,0,0,0)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"];
    }
    else if (idx == 1)
    {
      this.frequencyColors = ["rgba(255, 234, 125, 0.5)", "rgba(255, 234, 125, 0.5)", "rgba(0,0,0,0)", "rgba(0,0,0,0)"];
    }
    else if (idx == 2)
    {
      this.frequencyColors = ["rgba(242, 172, 46, 0.5)", "rgba(242, 172, 46, 0.5)", "rgba(242, 172, 46, 0.5)", "rgba(0,0,0,0)"];
    }
    else if (idx == 3)
    {
      this.frequencyColors = ["rgba(255, 84, 46, 0.5)", "rgba(255, 84, 46, 0.5)", "rgba(255, 84, 46, 0.5)", "rgba(255, 84, 46, 0.5)"];
    }
  }
}
