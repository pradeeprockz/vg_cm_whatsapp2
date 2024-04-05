import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaCampaignDataSummReportComponent } from './wa-campaign-data-summ-report.component';

describe('WaCampaignDataSummReportComponent', () => {
  let component: WaCampaignDataSummReportComponent;
  let fixture: ComponentFixture<WaCampaignDataSummReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaCampaignDataSummReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaCampaignDataSummReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
