import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsTempWaCompHeaderParamsReportComponent } from './cms-temp-wa-comp-header-params-report.component';

describe('CmsTempWaCompHeaderParamsReportComponent', () => {
  let component: CmsTempWaCompHeaderParamsReportComponent;
  let fixture: ComponentFixture<CmsTempWaCompHeaderParamsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsTempWaCompHeaderParamsReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsTempWaCompHeaderParamsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
