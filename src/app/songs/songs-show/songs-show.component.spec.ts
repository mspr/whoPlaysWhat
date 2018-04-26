import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsShowComponent } from './songs-show.component';

describe('SongComponent', () => {
  let component: SongsShowComponent;
  let fixture: ComponentFixture<SongsShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongsShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
