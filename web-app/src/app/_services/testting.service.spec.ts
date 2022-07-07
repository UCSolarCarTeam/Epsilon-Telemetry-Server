import { TestBed } from '@angular/core/testing';

import { TesttingService } from './testting.service';

describe('TesttingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TesttingService = TestBed.get(TesttingService);
    expect(service).toBeTruthy();
  });
});
