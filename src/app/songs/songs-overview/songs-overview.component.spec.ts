import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsOverviewComponent } from './songs-overview.component';

describe('SongsOverviewComponent', () => {
  let component: SongsOverviewComponent;
  let fixture: ComponentFixture<SongsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
