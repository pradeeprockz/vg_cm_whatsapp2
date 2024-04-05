import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsTempWaCompParamsReportComponent } from './cms-temp-wa-comp-params-report.component';

describe('CmsTempWaCompParamsReportComponent', () => {
  let component: CmsTempWaCompParamsReportComponent;
  let fixture: ComponentFixture<CmsTempWaCompParamsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsTempWaCompParamsReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsTempWaCompParamsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
