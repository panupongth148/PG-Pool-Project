import { TestBed } from '@angular/core/testing';

import { UserHttpRequestService } from './user-http-request.service';

describe('UserHttpRequestService', () => {
  let service: UserHttpRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHttpRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
