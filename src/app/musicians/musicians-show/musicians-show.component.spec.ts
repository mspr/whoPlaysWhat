import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusiciansShowComponent } from './musicians-show.component';

describe('MusiciansShowComponent', () => {
  let component: MusiciansShowComponent;
  let fixture: ComponentFixture<MusiciansShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusiciansShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusiciansShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
