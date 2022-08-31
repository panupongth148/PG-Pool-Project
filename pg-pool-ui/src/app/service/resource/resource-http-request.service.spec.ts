import { TestBed } from '@angular/core/testing';

import { ResourceHttpRequestService } from './resource-http-request.service';

describe('ResourceHttpRequestService', () => {
  let service: ResourceHttpRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceHttpRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
