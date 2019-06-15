import { TestBed } from '@angular/core/testing';

import { LapService } from './lap.service';

describe('LapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LapService = TestBed.get(LapService);
    expect(service).toBeTruthy();
  });
});
