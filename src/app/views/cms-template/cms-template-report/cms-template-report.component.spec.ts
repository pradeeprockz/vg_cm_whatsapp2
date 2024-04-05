import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsTemplateReportComponent } from './cms-template-report.component';

describe('CmsTemplateReportComponent', () => {
  let component: CmsTemplateReportComponent;
  let fixture: ComponentFixture<CmsTemplateReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsTemplateReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsTemplateReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
