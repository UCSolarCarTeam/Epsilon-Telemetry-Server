import { TestBed, inject } from '@angular/core/testing';

import { RoundingService } from './rounding.service';

describe('RoundingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoundingService]
    });
  });

  it('should be created', inject([RoundingService], (service: RoundingService) => {
    expect(service).toBeTruthy();
  }));
});
