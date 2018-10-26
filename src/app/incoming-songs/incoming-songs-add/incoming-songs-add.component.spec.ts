import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingSongsAddComponent } from './incoming-songs-add.component';

describe('IncomingSongsAddComponent', () => {
  let component: IncomingSongsAddComponent;
  let fixture: ComponentFixture<IncomingSongsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingSongsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingSongsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
