import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayEventsUpdateComponent } from './calendar-day-events-update.component';

describe('CalendarDayEventsUpdateComponent', () => {
  let component: CalendarDayEventsUpdateComponent;
  let fixture: ComponentFixture<CalendarDayEventsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarDayEventsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDayEventsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
