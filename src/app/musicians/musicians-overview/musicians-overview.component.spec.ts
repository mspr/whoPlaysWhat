import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusiciansOverviewComponent } from './musicians-overview.component';

describe('MusiciansOverviewComponent', () => {
  let component: MusiciansOverviewComponent;
  let fixture: ComponentFixture<MusiciansOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusiciansOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusiciansOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
