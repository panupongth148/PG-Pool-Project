import { TestBed } from '@angular/core/testing';

import { ProjectHttpRequestService } from './project-http-request.service';

describe('ProjectHttpRequestService', () => {
  let service: ProjectHttpRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectHttpRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
