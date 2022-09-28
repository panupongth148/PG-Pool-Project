import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartResourceComponent } from './chart-resource.component';

describe('ChartResourceComponent', () => {
  let component: ChartResourceComponent;
  let fixture: ComponentFixture<ChartResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartResourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
