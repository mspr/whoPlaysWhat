import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsUpdateComponent } from './songs-update.component';

describe('SongsUpdateComponent', () => {
  let component: SongsUpdateComponent;
  let fixture: ComponentFixture<SongsUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongsUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
