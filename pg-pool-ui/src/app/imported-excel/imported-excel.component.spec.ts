import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportedExcelComponent } from './imported-excel.component';

describe('ImportedExcelComponent', () => {
  let component: ImportedExcelComponent;
  let fixture: ComponentFixture<ImportedExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportedExcelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportedExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
