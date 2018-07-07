import { TestBed, inject } from '@angular/core/testing';

import { AuxBmsService } from './aux-bms.service';

describe('AuxBmsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuxBmsService]
    });
  });

  it('should be created', inject([AuxBmsService], (service: AuxBmsService) => {
    expect(service).toBeTruthy();
  }));
});
