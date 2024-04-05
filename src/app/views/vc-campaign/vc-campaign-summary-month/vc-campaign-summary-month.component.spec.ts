import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcCampaignSummaryMonthComponent } from './vc-campaign-summary-month.component';

describe('VcCampaignSummaryMonthComponent', () => {
  let component: VcCampaignSummaryMonthComponent;
  let fixture: ComponentFixture<VcCampaignSummaryMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcCampaignSummaryMonthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VcCampaignSummaryMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
