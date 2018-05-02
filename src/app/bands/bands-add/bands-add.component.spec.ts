import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandsAddComponent } from './bands-add.component';

describe('BandsAddComponent', () => {
  let component: BandsAddComponent;
  let fixture: ComponentFixture<BandsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
