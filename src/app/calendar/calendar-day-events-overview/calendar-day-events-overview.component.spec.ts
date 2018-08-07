import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayEventsOverviewComponent } from './calendar-day-events-overview.component';

describe('CalendarDayEventsOverviewComponent', () => {
  let component: CalendarDayEventsOverviewComponent;
  let fixture: ComponentFixture<CalendarDayEventsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarDayEventsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDayEventsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
