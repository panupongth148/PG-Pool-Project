import { TestBed } from '@angular/core/testing';

import { ExcelImportedService } from './excel-imported.service';

describe('ExcelImportedService', () => {
  let service: ExcelImportedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelImportedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
