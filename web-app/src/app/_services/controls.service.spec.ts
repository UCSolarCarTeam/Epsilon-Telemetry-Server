import { TestBed, inject } from '@angular/core/testing';

import { ControlsService } from './controls.service';

describe('ControlsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ControlsService]
    });
  });

  it('should be created', inject([ControlsService], (service: ControlsService) => {
    expect(service).toBeTruthy();
  }));
});
