import { TestBed } from '@angular/core/testing';

import { ApiHttpService } from './api-http.service';

describe('ApiHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiHttpService = TestBed.get(ApiHttpService);
    expect(service).toBeTruthy();
  });
});
