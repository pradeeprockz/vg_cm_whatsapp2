import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcCampaignComponent } from './vc-campaign.component';

describe('VcCampaignComponent', () => {
  let component: VcCampaignComponent;
  let fixture: ComponentFixture<VcCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcCampaignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VcCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
