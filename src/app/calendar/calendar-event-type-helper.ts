import { CalendarEventType } from './calendar-event-type.enum';

export class CalendarEventTypeHelper
{
  private static _names = CalendarEventTypeHelper.initializeNames();
  private static _images = CalendarEventTypeHelper.initializeImages();

  private static initializeNames()
  {
    let names = new Map<CalendarEventType, string>();
    names.set(CalendarEventType.Holidays, "Holidays");
    names.set(CalendarEventType.Concert, "Concert");
    names.set(CalendarEventType.Rehearsal, "Rehearsal");
    names.set(CalendarEventType.Recording, "Recording");
    names.set(CalendarEventType.Unknown, "Unknown");
    return names;
  }

  private static initializeImages()
  {
    let images = new Map<CalendarEventType, string>();
    images.set(CalendarEventType.Holidays, "holidays.jpg");
    images.set(CalendarEventType.Concert, "concert.jpg");
    images.set(CalendarEventType.Rehearsal, "rehearsal.jpg");
    images.set(CalendarEventType.Recording, "recording.jpg");
    images.set(CalendarEventType.Unknown, "unknwon.png");
    return images;
  }

  static getNames()
  {
    return Array.from(this._names.values());
  }

  static getImage(i : number)
  {
    return "assets/images/events/" + this._images.get(i);
  }

  static getImageFromTitle(title : string)
  {
    var image = this.getDefaultImage();

    for (let i=0; i < this._names.size; ++i)
    {
      let name = this._names.get(i).toLowerCase();
      if (title.toLowerCase().indexOf(name) >= 0)
      {
        image = "assets/images/events/" + this._images.get(i);
        break;
      }
    }

    return image;
  }

  static getDefaultImage()
  {
    return "assets/images/events/unknown.png";
  }
}
