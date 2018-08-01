export class DateHelper {

  private static _date = new Date();
  private static _monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  private static _monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  private static _dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  private static _dayShortNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  static isCurrentDay(day) {
    return DateHelper._date.getDate() === day;
  }

  static getCurrentYear() {
    return DateHelper._date.getFullYear();
  }

  static getMonthNames() {
    return DateHelper._monthNames;
  }

  static getMonthShortNames() {
    return DateHelper._monthShortNames;
  }

  static getDayNames() {
    return DateHelper._dayNames;
  }

  static getDayShortNames() {
    return DateHelper._dayShortNames;
  }

  static getCurrentMonth() {
    return DateHelper._monthNames[DateHelper._date.getMonth()];
  }

  static getCurrentMonthDays()
  {
    var year = DateHelper._date.getFullYear();
    var month = DateHelper._date.getMonth();
    var firstDateOfMonth = new Date(year, month, 1);
    var lastDateOfMonth = new Date(year, month+1, 0);
    var firstDayOfMonth = firstDateOfMonth.getDate();
    var lastDayOfMonth = lastDateOfMonth.getDate();
    var weekDayCount = lastDayOfMonth;
    var weekCount = Math.ceil(weekDayCount/7);

    var currentMonthDaysLength = weekCount*7;
    var currentMonthDays = new Array();

    var firstDayOffset = firstDateOfMonth.getDay() - 1;
    if (firstDayOffset == -1)
      firstDayOffset = 6;

    // Merge between last days of last month and first days of current month
    for (var i=0; i<firstDayOffset; ++i)
      currentMonthDays.push(undefined);

    // Populate current month days
    for (var i=1; i<=weekDayCount; ++i)
      currentMonthDays.push(i);

    // Merge between last days of current month and first days of next month
    for (var i=0; i<currentMonthDaysLength - (weekDayCount + firstDayOffset); ++i)
      currentMonthDays.push(undefined);

    // Split days per week
    var currentMonthDaysPerWeek = [];
    for (var i=0; i<weekCount; ++i)
      currentMonthDaysPerWeek.push(currentMonthDays.splice(0, 7));

    return currentMonthDaysPerWeek;
  }
}
