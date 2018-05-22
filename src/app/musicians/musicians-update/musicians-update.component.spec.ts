import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusiciansUpdateComponent } from './musicians-update.component';

describe('MusiciansUpdateComponent', () => {
  let component: MusiciansUpdateComponent;
  let fixture: ComponentFixture<MusiciansUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusiciansUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusiciansUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
