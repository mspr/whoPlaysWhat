import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayEventsShowComponent } from './calendar-day-events-show.component';

describe('CalendarDayEventsShowComponent', () => {
  let component: CalendarDayEventsShowComponent;
  let fixture: ComponentFixture<CalendarDayEventsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarDayEventsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDayEventsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
