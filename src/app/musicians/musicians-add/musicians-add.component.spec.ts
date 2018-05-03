import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusiciansAddComponent } from './musicians-add.component';

describe('MusiciansAddComponent', () => {
  let component: MusiciansAddComponent;
  let fixture: ComponentFixture<MusiciansAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusiciansAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusiciansAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
