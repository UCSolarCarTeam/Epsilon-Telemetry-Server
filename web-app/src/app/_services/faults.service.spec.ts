import { TestBed, inject } from '@angular/core/testing';

import { FaultsService } from './faults.service';

describe('FaultsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FaultsService]
    });
  });

  it('should be created', inject([FaultsService], (service: FaultsService) => {
    expect(service).toBeTruthy();
  }));
});
