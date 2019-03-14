import { TestBed, inject } from '@angular/core/testing';

import { Data.InitService } from './data.init.service';

describe('Data.InitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Data.InitService]
    });
  });

  it('should be created', inject([Data.InitService], (service: Data.InitService) => {
    expect(service).toBeTruthy();
  }));
});
