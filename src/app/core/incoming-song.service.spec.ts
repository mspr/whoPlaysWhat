import { TestBed, inject } from '@angular/core/testing';

import { IncomingSongService } from './incoming-song.service';

describe('IncomingSongService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IncomingSongService]
    });
  });

  it('should be created', inject([IncomingSongService], (service: IncomingSongService) => {
    expect(service).toBeTruthy();
  }));
});
