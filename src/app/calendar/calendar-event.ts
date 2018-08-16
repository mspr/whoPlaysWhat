import { CalendarEventType } from './calendar-event-type.enum';

export class CalendarEvent
{
  public title = '';
  public description = '';
  public type : CalendarEventType;
  public start : number;
  public end : number;
  public picture : string;

  constructor(title : string, description : string, type : CalendarEventType, start : number, end : number)
  {
    this.title = title;
    this.description = description;
    this.type = type;
    this.start = start;
    this.end = end;
  }

  public isTakingPlace(day : Date)
  {
    var time = day.getTime();
    return time >= this.start && time <= this.end;
  }
}
