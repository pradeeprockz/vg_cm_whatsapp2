import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcCampaignImportComponent } from './vc-campaign-import.component';

describe('VcCampaignImportComponent', () => {
  let component: VcCampaignImportComponent;
  let fixture: ComponentFixture<VcCampaignImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VcCampaignImportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VcCampaignImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
