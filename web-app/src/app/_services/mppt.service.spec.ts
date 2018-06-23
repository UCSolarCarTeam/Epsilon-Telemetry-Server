import { TestBed, inject } from '@angular/core/testing';

import { MpptService } from './mppt.service';

describe('MpptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MpptService]
    });
  });

  it('should be created', inject([MpptService], (service: MpptService) => {
    expect(service).toBeTruthy();
  }));
});
