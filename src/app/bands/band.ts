import { IncomingSong } from '../incoming-songs/incoming-song';
import { CalendarEvent } from '../calendar/calendar-event';

export class Band
{
  public id? : number;
  public name : string;
  public picture : string;
  public songs = [];
  public incomingSongs : IncomingSong[] = [];
  public musicians = [];
  public musiciansColor = [];
  public notes = [];
  public events = [];

  constructor()
  {
    this.picture = "./assets/images/bands/unknown.png";
  }

  static fromJSON(info)
  {
    let band = new Band();

    band.name = info.name;
    band.id = info.id;
    band.picture = info.picture;
    band.songs = info.songs;
    band.incomingSongs = info.incomingSongs;
    band.notes = info.notes;
    band.events = info.events;
    band.musicians = info.musicians;
    band.musiciansColor = info.musiciansColor;

    return band;
  }

  public getDayEvents(day: Date)
  {
    var events = new Array<CalendarEvent>();

    if (this.events != undefined)
    {
      this.events.forEach(eventInfo => {
        let event = CalendarEvent.fromInfo(eventInfo);
        if (event.isTakingPlaceOnDay(day))
          events.push(event);
      });
    }

    return events;
  }

  public getEventsAt(hour: Date)
  {
    var events = new Array<CalendarEvent>();

    if (this.events != undefined)
    {
      this.events.forEach(eventInfo => {
        let event = CalendarEvent.fromInfo(eventInfo);
        if (event.isTakingPlaceAt(hour))
          events.push(event);
      });
    }

    return events;
  }

  public hasDayEvents(day: Date)
  {
    return this.getDayEvents(day).length > 0;
  }

  public hasEventsAt(hour: Date)
  {
    return this.getEventsAt(hour).length > 0;
  }
}
