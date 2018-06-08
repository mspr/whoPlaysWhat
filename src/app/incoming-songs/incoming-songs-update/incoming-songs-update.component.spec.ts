import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingSongsUpdateComponent } from './incoming-songs-update.component';

describe('IncomingSongsUpdateComponent', () => {
  let component: IncomingSongsUpdateComponent;
  let fixture: ComponentFixture<IncomingSongsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingSongsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingSongsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
