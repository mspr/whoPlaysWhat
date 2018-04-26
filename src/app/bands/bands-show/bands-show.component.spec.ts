import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandsShowComponent } from './bands-show.component';

describe('BandComponent', () => {
  let component: BandsShowComponent;
  let fixture: ComponentFixture<BandsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
