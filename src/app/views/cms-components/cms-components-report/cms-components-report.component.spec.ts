import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsComponentsReportComponent } from './cms-components-report.component';

describe('CmsComponentsReportComponent', () => {
  let component: CmsComponentsReportComponent;
  let fixture: ComponentFixture<CmsComponentsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CmsComponentsReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CmsComponentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
