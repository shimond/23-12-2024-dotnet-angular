import { TestBed } from '@angular/core/testing';

import { CoutnerService } from './coutner.service';

describe('CoutnerService', () => {
  let service: CoutnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoutnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
