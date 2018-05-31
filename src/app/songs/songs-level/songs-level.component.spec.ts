import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsLevelComponent } from './songs-level.component';

describe('SongsLevelComponent', () => {
  let component: SongsLevelComponent;
  let fixture: ComponentFixture<SongsLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongsLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
