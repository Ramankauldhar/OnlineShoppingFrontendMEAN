import { TestBed } from '@angular/core/testing';

import { FetchDataServiceService } from './fetch-data-service.service';

describe('FetchDataServiceService', () => {
  let service: FetchDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
