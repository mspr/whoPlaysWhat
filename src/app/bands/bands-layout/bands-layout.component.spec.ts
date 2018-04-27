import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BandsLayoutComponent } from './bands-layout.component';

describe('BandsLayoutComponent', () => {
  let component: BandsLayoutComponent;
  let fixture: ComponentFixture<BandsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BandsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
