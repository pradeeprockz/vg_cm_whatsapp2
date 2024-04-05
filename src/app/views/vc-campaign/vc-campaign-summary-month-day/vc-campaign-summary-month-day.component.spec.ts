import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcCampaignSummaryMonthDayComponent } from './vc-campaign-summary-month-day.component';

describe('VcCampaignSummaryMonthDayComponent', () => {
  let component: VcCampaignSummaryMonthDayComponent;
  let fixture: ComponentFixture<VcCampaignSummaryMonthDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcCampaignSummaryMonthDayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VcCampaignSummaryMonthDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
