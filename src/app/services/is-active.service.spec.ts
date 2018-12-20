import { TestBed, inject } from '@angular/core/testing';

import { IsActiveService } from './is-active.service';

describe('IsActiveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsActiveService]
    });
  });

  it('should be created', inject([IsActiveService], (service: IsActiveService) => {
    expect(service).toBeTruthy();
  }));
});
