import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaCampaignScheduleDataSummReportComponent } from './wa-campaign-schedule-data-summ-report.component';

describe('WaCampaignScheduleDataSummReportComponent', () => {
  let component: WaCampaignScheduleDataSummReportComponent;
  let fixture: ComponentFixture<WaCampaignScheduleDataSummReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaCampaignScheduleDataSummReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaCampaignScheduleDataSummReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
