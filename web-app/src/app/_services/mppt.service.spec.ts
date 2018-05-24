import { TestBed, inject } from '@angular/core/testing';

import { MPPTService } from './mppt.service';

describe('MpptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MPPTService]
    });
  });

  it('should be created', inject([MPPTService], (service: MPPTService) => {
    expect(service).toBeTruthy();
  }));
});
