import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SongsStructureComponent } from './songs-structure.component';

describe('SongsStructureComponent', () => {
  let component: SongsStructureComponent;
  let fixture: ComponentFixture<SongsStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SongsStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SongsStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
