import { TestBed, inject } from '@angular/core/testing';

import { PacketService } from './packet.service';

describe('PacketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PacketService]
    });
  });

  it('should be created', inject([PacketService], (service: PacketService) => {
    expect(service).toBeTruthy();
  }));
});
