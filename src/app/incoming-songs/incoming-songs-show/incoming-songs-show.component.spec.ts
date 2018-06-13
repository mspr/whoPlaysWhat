import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingSongsShowComponent } from './incoming-songs-show.component';

describe('IncomingSongsShowComponent', () => {
  let component: IncomingSongsShowComponent;
  let fixture: ComponentFixture<IncomingSongsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingSongsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingSongsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
