import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutStatusSummReportComponent } from './out-status-summ-report.component';

describe('OutStatusSummReportComponent', () => {
  let component: OutStatusSummReportComponent;
  let fixture: ComponentFixture<OutStatusSummReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutStatusSummReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OutStatusSummReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
