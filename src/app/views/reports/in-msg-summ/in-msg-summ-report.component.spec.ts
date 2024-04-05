import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InMsgSummReportComponent } from './in-msg-summ-report.component';

describe('InMsgSummReportComponent', () => {
  let component: InMsgSummReportComponent;
  let fixture: ComponentFixture<InMsgSummReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InMsgSummReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InMsgSummReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
