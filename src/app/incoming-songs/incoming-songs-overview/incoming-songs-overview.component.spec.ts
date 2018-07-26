import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingSongsOverviewComponent } from './incoming-songs-overview.component';

describe('IncomingSongsOverviewComponent', () => {
  let component: IncomingSongsOverviewComponent;
  let fixture: ComponentFixture<IncomingSongsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingSongsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingSongsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
