import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarResourceComponent } from './calendar-resource.component';

describe('CalendarResourceComponent', () => {
  let component: CalendarResourceComponent;
  let fixture: ComponentFixture<CalendarResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarResourceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
