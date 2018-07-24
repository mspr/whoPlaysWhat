import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarShowComponent } from './calendar-show.component';

describe('CalendarShowComponent', () => {
  let component: CalendarShowComponent;
  let fixture: ComponentFixture<CalendarShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
