import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingSongsListComponent } from './incoming-songs-list.component';

describe('IncomingSongsListComponent', () => {
  let component: IncomingSongsListComponent;
  let fixture: ComponentFixture<IncomingSongsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingSongsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingSongsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
