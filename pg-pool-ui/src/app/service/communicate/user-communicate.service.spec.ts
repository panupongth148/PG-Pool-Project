import { TestBed } from '@angular/core/testing';

import { UserCommunicateService } from './user-communicate.service';

describe('UserCommunicateService', () => {
  let service: UserCommunicateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserCommunicateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
